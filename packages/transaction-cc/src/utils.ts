import { FlatConvectorModel } from '@worldsibu/convector-core';
import { appConstants as c, GoodsInput, Goods, GenericBalance } from '@solidary-network/common-cc';
import { Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc';
import { Cause } from '@solidary-network/cause-cc';
import { EntityType } from '@solidary-network/common-cc';
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

// inner function to get item from input/output entity models
const getEntityGoodsStockItem = (goodsStock: Array<FlatConvectorModel<Goods>>, code: string): FlatConvectorModel<Goods> => {
  return goodsStock.find((e: Goods) => e.code === code);
};

// helper function to get entity model from input/output entity
export const getEntityModel = (type: string, id: string): Promise<Participant | Person | Cause> => {
  return new Promise(async (resolve, reject) => {
    try {
      let entityModel: Participant | Person | Cause;
      switch (type) {
        case c.CONVECTOR_MODEL_PATH_PARTICIPANT:
          entityModel = await Participant.getById(id);
          break;
        case c.CONVECTOR_MODEL_PATH_PERSON:
          entityModel = await Person.getById(id);
          break;
        case c.CONVECTOR_MODEL_PATH_CAUSE:
          entityModel = await Cause.getById(id);
          break;
        default:
          throw new Error(`Unknown entity type '${type}'`);
      }
      resolve(entityModel);
    } catch (error) {
      reject(error);
    };
  })
};

/**
 * this process goodsInput, this will 
 * @param outputEntity target entity
 * @param transactionGoodsInput payload array of goods to add/credit or subtract/debit
 * @param credit credit/true or debit/false
 * @param loggedPerson the person that sent the transaction
 */
export const processGoodsInput = (inputEntity: Participant | Person | Cause, outputEntity: Participant | Person | Cause, transactionGoodsInput: Array<GoodsInput>, loggedPerson: Person)
  // TODO: remove this
  : Promise<Array<FlatConvectorModel<Goods>>> => {
  // TODO: OR SAVE models inside this function
  return new Promise(async (resolve, reject) => {
    try {
      // start looping goodsInputResult
      transactionGoodsInput.forEach((e: GoodsInput) => {
        debugger;
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
          if (!inputItemIndex || inputEntity.goodsStock[inputItemIndex].balance.balance < e.quantity)
          throw new Error(`You must have a sufficient quantity of goods of item code:[${e.code}] to complete the transaction'`);
        }

        // init balance, if don't have input balance can occur if is a person, other entities fail in above protection, and must have a balance
        // if (!('balance' in inputEntity.goodsStock[inputItemIndex])) {
        //   inputEntity.goodsStock[inputItemIndex].balance = new GenericBalance();
        // }
        // if have sufficient quantity proceed discount item quantity in inputEntity.goodsStock, for all entities (if fails in stock for participant or cause it throw error on the above code block)
        // inputEntity.goodsStock[inputItemIndex].balance.debit += e.quantity;
        // inputEntity.goodsStock[inputItemIndex].balance.balance -= e.quantity;

        // if don't exists create a new one and push it to outputEntity.goodsStock
        if (inputItemIndex < 0) {
          // protection required fields, only when are create a new item in goodsStock
          if (!e.code || !e.name) {
            throw new Error(`You must supply a code and name when create new goods'`);
          }
          // init a new goodsObject with id/uuid (uuid is sent in graphql, and if is a new item we use it here)
          const newItemGoods = new Goods(e.id);
          newItemGoods.balance = new GenericBalance();
          // required fields
          newItemGoods.code = e.code;
          newItemGoods.name = e.name;
          newItemGoods.barCode = (e.barCode) ? e.barCode : undefined;
          newItemGoods.description = (e.description) ? e.description : undefined;
          newItemGoods.tags = (e.tags) ? e.tags : undefined;
          newItemGoods.metaData = (e.metaData) ? e.metaData : undefined;
          newItemGoods.metaDataInternal = (e.metaDataInternal) ? e.metaDataInternal : undefined;
          // add date in epoch unix time
          newItemGoods.createdDate = new Date().getTime();
          // assign createdByPersonId
          newItemGoods.createdByPersonId = loggedPerson.id;
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
          const newItemGoods = new Goods(e.id);
          newItemGoods.balance = new GenericBalance();
          // required fields
          newItemGoods.code = e.code;
          newItemGoods.name = e.name;
          newItemGoods.barCode = (e.barCode) ? e.barCode : undefined;
          newItemGoods.description = (e.description) ? e.description : undefined;
          newItemGoods.tags = (e.tags) ? e.tags : undefined;
          newItemGoods.metaData = (e.metaData) ? e.metaData : undefined;
          newItemGoods.metaDataInternal = (e.metaDataInternal) ? e.metaDataInternal : undefined;
          // add date in epoch unix time
          newItemGoods.createdDate = new Date().getTime();
          // assign createdByPersonId
          newItemGoods.createdByPersonId = loggedPerson.id;
// credit balance properties
newItemGoods.balance.credit += e.quantity;
newItemGoods.balance.balance += e.quantity;
// push it to outputEntity.goodsStock
outputEntity.goodsStock.push(newItemGoods);
        } else {
          // if already exists, work in it's balance
outputEntity.goodsStock[inputItemIndex].balance.credit += e.quantity;
outputEntity.goodsStock[inputItemIndex].balance.balance += e.quantity;
        }
      });
      // const currentNonUsedInGoodsInputResult: Array<FlatConvectorModel<Goods>> = existingCodes.map((e: string) => getEntityGoodsStockItem(outputEntity.goodsStock, e));
      // resolve promise, combining both arrays
      // resolve([...goodsOutputResult, ...currentNonUsedInGoodsInputResult]);
      
      // TODO: resolve something useful
      resolve();
    } catch (error) {
      // reject promise
      reject(error);
    }
  })
};
