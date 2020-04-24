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

/**
 * this process goodsInput, this will 
 * @param outputEntity target entity
 * @param goodsInput payload array of goods to add/credit or subtract/debit
 * @param credit credit/true or debit/false
 * @param loggedPerson the person that sent the transaction
 */
export const processGoodsInput = (outputEntity: Participant | Person | Cause, goodsInput: Array<GoodsInput>, credit: boolean, loggedPerson: Person): Promise<Array<FlatConvectorModel<Goods>>> => {
  return new Promise(async (resolve, reject) => {
    try {
      // inner function to get item from 
      const getEntityGoodsStockItem = (code: string): FlatConvectorModel<Goods> => entityModel.goodsStock.find((e: Goods) => e.code === code);

      // initialize model entity
      let entityModel: Participant | Person | Cause;
      switch (outputEntity.type) {
        case c.CONVECTOR_MODEL_PATH_PARTICIPANT:
          entityModel = await Participant.getById(outputEntity.id);
          break;
        case c.CONVECTOR_MODEL_PATH_PERSON:
          entityModel = await Person.getById(outputEntity.id);
          break;
        case c.CONVECTOR_MODEL_PATH_CAUSE:
          entityModel = await Cause.getById(outputEntity.id);
          break;
        default:
          throw new Error(`Unknown entity type '${outputEntity.type}'`);
      }

      // array of codes of existing items, this will be used to loop and get all items for merge with goodsInputResult
      const existingCodes: string[] = entityModel.goodsStock.map((e: Goods) => e.code);
      // process result
      const goodsInputResult: Array<FlatConvectorModel<Goods>> = goodsInput.map((e: GoodsInput) => {

        // protection required fields
        if (!e.quantity || (e.quantity && e.quantity < 0)) {
          throw new Error(`You must supply a positive quantity in all items of the goods property array'`);
        }

        // get currentGoods item
        let currentGoods: FlatConvectorModel<Goods> = getEntityGoodsStockItem(e.code);

        // if don't exists create a new one and assign its properties from payload, this init is only created once, on new fresh object
        if (!currentGoods) {
          // protection required fields
          if (!e.code/* || !e.name name can be omitted if just add quantity we only need code */) {
            throw new Error(`You must supply a code and name in all items of the goods property array'`);
          }
          // init a new goodsObject with id/uuid
          currentGoods = new Goods(e.id);
          currentGoods.balance = new GenericBalance();
          // required fields
          currentGoods.code = e.code;
          currentGoods.name = e.name;
          currentGoods.barCode = (e.barCode) ? e.barCode : undefined;
          currentGoods.description = (e.description) ? e.description : undefined;
          currentGoods.tags = (e.tags) ? e.tags : undefined;
          currentGoods.metaData = (e.metaData) ? e.metaData : undefined;
          currentGoods.metaDataInternal = (e.metaDataInternal) ? e.metaDataInternal : undefined;
          // add date in epoch unix time
          currentGoods.createdDate = new Date().getTime();
          // assign createdByPersonId
          currentGoods.createdByPersonId = loggedPerson.id;
        } else {
          // if already exists, remove item from existingCodes, and just increment balance below, without change in any other property
          existingCodes.splice(existingCodes.indexOf(e.code), 1);
        }
        // work on balance for both
        currentGoods.balance.credit += e.quantity;
        currentGoods.balance.balance += e.quantity;
        // return the currentGoods
        return currentGoods;
      });
      const currentNonUsedInGoodsInputResult: Array<FlatConvectorModel<Goods>> = existingCodes.map((e: string) => getEntityGoodsStockItem(e));
      // resolve promise, combining both arrays
      resolve([...goodsInputResult, ...currentNonUsedInGoodsInputResult]);
    } catch (error) {
      // reject promise
      reject(error);
    }
  })
};
