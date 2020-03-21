import { appConstants as c } from '@solidary-network/common-cc';
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
 * richQuery helper to check duplicated fields on model Person
 */
export const checkDuplicatedField = async (fieldName: string, fieldValue: string) => {
  // check duplicated
  const exists = await Person.query(Person, {
    selector: {
      type: c.CONVECTOR_MODEL_PATH_PERSON,
      [fieldName]: fieldValue,
      // participant: { id: participant.id }
    }
  });
  if ((exists as Person[]).length > 0) {
    // remove first _ ex _id to id before display error
    const fieldDisplay: string = (fieldName.startsWith('_')) ? fieldName.substr(1, fieldName.length) : fieldName;
    throw new Error(`There is a asset registered with that ${fieldDisplay} '${fieldValue}'`);
  }
}
