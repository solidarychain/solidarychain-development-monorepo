import { Cause } from '@solidary-network/cause-cc';
import { appConstants as c, EntityType, GenericBalance, Goods, GoodsInput } from '@solidary-network/common-cc';
import { Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc';
import { Transaction } from './transaction.model';

// interface Entity and getEntity() function duplicated with asset, cause and transaction, to prevent circular dependencies, 
// this way we leave common package clean of dependencies like person-cc and participant-cc
export const getEntity = (entityType: EntityType, id: string): Promise<Participant | Person | Cause> => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (entityType) {
        case EntityType.Participant:
          const participant = await Participant.getById(id);
          if (!!participant && !participant.id) {
            throw new Error(`No participant found with id ${id}`);
          }
          resolve(participant);
          break;
        case EntityType.Person:
          const person = await Person.getById(id);
          if (!person || !person.id) {
            throw new Error(`No person found with id ${id}`);
          }
          resolve(person);
          break;
        case EntityType.Cause:
          const cause = await Cause.getById(id);
          if (!cause || !cause.id) {
            throw new Error(`No cause found with id ${id}`);
          }
          resolve(cause);
          break;
        default:
          throw new Error(`Invalid input EntityType ${entityType}`);
      }
    } catch (error) {
      // reject promise
      reject(error);
    }
  })
};

/**
 * every model has is checkUniqueField implementation with its type
 * richQuery helper to check unique fields on model Transaction
 */
export const checkUniqueField = async (fieldName: string, fieldValue: string, required: boolean) => {
  if (!required && !fieldValue) {
    return;
  }
  const exists = await Transaction.query(Transaction, {
    selector: {
      type: c.CONVECTOR_MODEL_PATH_TRANSACTION,
      [fieldName]: fieldValue,
    }
  });
  if ((exists as Transaction[]).length > 0) {
    // remove first _ ex _id to id before display error
    const fieldDisplay: string = (fieldName.startsWith('_')) ? fieldName.substr(1, fieldName.length) : fieldName;
    throw new Error(`There is a transaction registered with that ${fieldDisplay} '${fieldValue}'`);
  }
}

/**
 * common helper function to be used to create new good items in processGoodsInput function
 * this function will be called when create goodsItem fo result, for inputEntity and outputEntity 
 * when they don't have yet, the goods item in goodsStock, we need to create one and add it to the array
 * after we create the newItemGoods based on current goodsInput element, we just need to add balance and push to final arrays
 * @param goodsInput 
 * @param loggedPersonId 
 */
const newGoodsItem = (goodsInput: GoodsInput, loggedPerson: Person): Goods => {
  const newItemGoods = new Goods(goodsInput.id);
  newItemGoods.balance = new GenericBalance();
  // required fields
  newItemGoods.code = goodsInput.code;
  newItemGoods.name = goodsInput.name;
  newItemGoods.barCode = (goodsInput.barCode) ? goodsInput.barCode : undefined;
  newItemGoods.description = (goodsInput.description) ? goodsInput.description : undefined;
  newItemGoods.tags = (goodsInput.tags) ? goodsInput.tags : undefined;
  newItemGoods.metaData = (goodsInput.metaData) ? goodsInput.metaData : undefined;
  newItemGoods.metaDataInternal = (goodsInput.metaDataInternal) ? goodsInput.metaDataInternal : undefined;
  // add date in epoch unix time
  newItemGoods.createdDate = new Date().getTime();
  // assign createdByPersonId
  newItemGoods.createdByPersonId = loggedPerson.id;
  // return the new goods object
  return newItemGoods;
}

/**
 * this process goodsInput from inputEntity to outputEntity
 * @param inputEntity target entity
 * @param outputEntity target entity
 * @param transactionGoodsInput payload array of goods to add/credit or subtract/debit
 * @param loggedPerson the person that sent the transaction
 */
export const processTransferGoodsInput = (inputEntity: Participant | Person | Cause, outputEntity: Participant | Person | Cause, transactionGoodsInput: Array<GoodsInput>, loggedPerson: Person)
  : Promise<Array<Goods>> => {
  return new Promise(async (resolve, reject) => {
    try {
      // init resultGoodsTransacted
      const resultGoodsTransacted: Array<Goods> = new Array<Goods>();

      // start looping goodsInputResult
      transactionGoodsInput.forEach((e: GoodsInput) => {
        // get input and output indexes
        const inputItemIndex = inputEntity.goodsStock.findIndex((i: Goods) => i.code == e.code);
        const outputItemIndex = outputEntity.goodsStock.findIndex((i: Goods) => i.code == e.code);

        // protection required fields
        if (!e.quantity || (e.quantity && e.quantity <= 0)) {
          throw new Error(`You must supply a positive quantity in item code: [${e.code}]'`);
        }

        // protection valid stock balance: if is a cause or participant must contemplate the stock in balance, persons don't have stock balance, can go to negative value
        if (inputEntity.type === c.CONVECTOR_MODEL_PATH_PARTICIPANT || inputEntity.type === c.CONVECTOR_MODEL_PATH_CAUSE) {
          // protection for stock balance
          if (!inputItemIndex || e.quantity > inputEntity.goodsStock[inputItemIndex].balance.balance)
            throw new Error(`You must have a sufficient quantity of goods of item code:[${e.code}] to complete the transaction'`);
        }

        // always create a goods item to add to result, this will be resolved in promise to be stored in transaction
        const resultItemGoods = newGoodsItem(e, loggedPerson);
        // only add credit and balance acts has quantity transacted
        resultItemGoods.balance.credit = e.quantity;
        resultItemGoods.balance.balance = e.quantity;
        // now push it resultItemGoods
        resultGoodsTransacted.push(resultItemGoods);

        // if don't exists create a new one and push it to outputEntity.goodsStock
        if (inputItemIndex < 0) {
          // protection required fields, only when are create a new item in goodsStock
          if (!e.id || !e.code || !e.name) {
            throw new Error(`You must supply a id, code and name when create new goods'`);
          }
          // init a new goodsObject with id/uuid (uuid is sent in graphql, and if is a new item we use it here)
          const newItemGoods = newGoodsItem(e, loggedPerson);
          // debit balance properties
          newItemGoods.balance.debit += e.quantity;
          newItemGoods.balance.balance -= e.quantity;
          // push it to inputEntity.goodsStock
          inputEntity.goodsStock.push(newItemGoods);
        } else {
          // if already exists, work in it's balance
          inputEntity.goodsStock[inputItemIndex].balance.debit += e.quantity;
          inputEntity.goodsStock[inputItemIndex].balance.balance -= e.quantity;
        }

        // if don't exists create a new one and push it to outputEntity.goodsStock
        if (outputItemIndex < 0) {
          // protection required fields, only when are create a new item in goodsStock
          if (!e.code || !e.name) {
            throw new Error(`You must supply a code and name when create new goods'`);
          }
          // init a new goodsObject with id/uuid (uuid is sent in graphql, and if is a new item we use it here)
          const newItemGoods = newGoodsItem(e, loggedPerson);
          // credit balance properties
          newItemGoods.balance.credit += e.quantity;
          newItemGoods.balance.balance += e.quantity;
          // push it to outputEntity.goodsStock
          outputEntity.goodsStock.push(newItemGoods);
        } else {
          // if already exists, work in it's balance
          outputEntity.goodsStock[outputItemIndex].balance.credit += e.quantity;
          outputEntity.goodsStock[outputItemIndex].balance.balance += e.quantity;
        }
      });
      // resolve resultGoodsTransacted
      resolve(resultGoodsTransacted);
    } catch (error) {
      // reject promise
      reject(error);
    }
  })
};
