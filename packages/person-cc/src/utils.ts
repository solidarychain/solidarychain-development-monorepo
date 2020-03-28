import { appConstants as c, asyncForEach } from '@solidary-network/common-cc';
import * as bcrypt from 'bcrypt';
import { Person } from './person.model';

// duplicated with 
// packages/person-cc/src/utils.ts
// packages/participant-cc/src/utils.ts

const bcryptSaltRounds: number = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcryptSaltRounds);
};


/**
 * every model has is checkUniqueField implementation with its type
 * richQuery helper to check unique fields on model Person
 */
export const checkUniqueField = async (fieldName: string, fieldValue: string, required: boolean) => {
  if (!required && !fieldValue) {
    return;
  }
  const exists = await Person.query(Person, {
    selector: {
      type: c.CONVECTOR_MODEL_PATH_PERSON,
      [fieldName]: fieldValue,
    }
  });
  if ((exists as Person[]).length > 0) {
    // remove first _ ex _id to id before display error
    const fieldDisplay: string = (fieldName.startsWith('_')) ? fieldName.substr(1, fieldName.length) : fieldName;
    throw new Error(`There is a person registered with that ${fieldDisplay} '${fieldValue}'`);
  }
}

/**
 * helper function to check if all person ids are valid
 * required asyncForEach to solve the problem of async/await in arrays
 * use with await ex `await asyncForEach`
 * @param persons array of person ids
 */
export const checkValidPersons = async (persons: string[]) => {
  // check if ambassadors are valid persons
  if (persons && persons.length > 0) {
    const invalidIds: string[] = [];

    // require to use await asyncForEach to solve the problem of async/await and forEach()
    await asyncForEach(persons, async (id) => {
      const ambassador: Person = await Person.getOne(id);
      console.log(`ambassador ${id}`, JSON.stringify(ambassador, undefined, 2));
      if (!!ambassador && !ambassador.id) {
        invalidIds.push(id);
        console.log(`ambassador ${id} invalidIds`, JSON.stringify(invalidIds, undefined, 2));
      }
    })
    console.log('invalidIds.length', invalidIds.length);
    // throw exception outside of forEach
    if (invalidIds.length > 0) {
      throw new Error(`There is no ambassador(s) with Id(s) (${invalidIds.join(',')})`);
    }
  }
}
