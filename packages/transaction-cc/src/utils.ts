import { appConstants as c } from '@solidary-network/common-cc';
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
          // old without custom static helper
          const participant = await Participant.getOne(id);
          // TODO
          // const participant = await Participant.getById(id);
          if (!!participant && !participant.id) {
            throw new Error(`No participant found with id ${id}`);
          }
          resolve(participant);
          break;
        case EntityType.Person:
          const person = await Person.getOne(id);
          if (!person || !person.id) {
            throw new Error(`No person found with id ${id}`);
          }
          resolve(person);
          break;
        case EntityType.Cause:
          const cause = await Cause.getOne(id);
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
export const checkUniqueField = async (fieldName: string, fieldValue: string) => {
  const exists = await Transaction.query(Transaction, {
    selector: {
      type: c.CONVECTOR_MODEL_PATH_TRANSACTION,
      [fieldName]: fieldValue,
      // participant: { id: participant.id }
    }
  });
  if ((exists as Transaction[]).length > 0) {
    // remove first _ ex _id to id before display error
    const fieldDisplay: string = (fieldName.startsWith('_')) ? fieldName.substr(1, fieldName.length) : fieldName;
    throw new Error(`There is a transaction registered with that ${fieldDisplay} '${fieldValue}'`);
  }
}
