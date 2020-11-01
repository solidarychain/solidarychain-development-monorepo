import { Cause } from '@solidary-chain/cause-cc';
import { appConstants as c, EntityType } from '@solidary-chain/common-cc';
import { Participant } from '@solidary-chain/participant-cc';
import { Person } from '@solidary-chain/person-cc';
import { Asset } from './asset.model';

// interface Entity and getEntity() function duplicated with asset, cause and transaction, to prevent circular dependencies, 
// this way we leave common package clean of dependencies like person-cc and participant-cc
export const getEntity = (entityType: EntityType, id: string): Promise<Participant | Person | Cause> => {
  return new Promise(async (resolve, reject) => {
    try {
      // use trySwitch inner function, to solve problem `async await in switch case statement don't work`
      const trySwitch = async () => {
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
      }
      // call trySwitch
      await trySwitch();
    } catch (error) {
      // reject promise
      reject(error);
    }
  })
};

/**
 * every model has is checkUniqueField implementation with its type
 * richQuery helper to check unique fields on model Asset
 */
export const checkUniqueField = async (fieldName: string, fieldValue: string, required: boolean, excludeId: string = null) => {
  if (!required && !fieldValue) {
    return;
  }
  const selector: any = {
    type: c.CONVECTOR_MODEL_PATH_ASSET,
    [fieldName]: fieldValue,
  };
  // inject excludeId
  if (excludeId) {
    selector._id = { $ne: excludeId };
  }
  const exists = await Asset.query(Asset, { selector });
  if ((exists as Asset[]).length > 0) {
    // remove first _ ex _id to id before display error
    const fieldDisplay: string = (fieldName.startsWith('_')) ? fieldName.substr(1, fieldName.length) : fieldName;
    throw new Error(`There is a asset registered with that ${fieldDisplay} '${fieldValue}'`);
  }
}