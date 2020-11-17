// not used anymore

import { Common } from './common.model';
import { v4 as uuid } from 'uuid';
import * as cryptoJs from "crypto-js"

// convert comma string float to float ex '1,81' to 1.81
export const convertStringToFloat = (input: string): number => parseFloat(input.replace(/,/g, '.'));

/**
 * get newUuid
 */
export const newUuid = () => uuid();

/**
 * encrypt
 */
export const encrypt = (message: string): string => cryptoJs.AES.encrypt(message, 'secret key 123').toString();

/**
 * decrypt
 */
export const decrypt = (cipherText: string): string => {
  const bytes = cryptoJs.AES.decrypt(cipherText, 'secret key 123');
  return bytes.toString(cryptoJs.enc.Utf8);
};

/**
 * random password
 */
export const newPassword = (length: number = 10): string => {
  const charset: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#%&~!@-#$';
  let result = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    result += charset.charAt(Math.floor(Math.random() * n));
  }
  return result;
}

/**
 * random string
 */
export const randomString = (length: number = 10): string => {
  const charset: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    result += charset.charAt(Math.floor(Math.random() * n));
  }
  return result;
}

// not used anymore
// convert from citizen card date format '19 12 1971' to Date
export const citizenCardDateToIsoDate = (inputDate: string) => {
  try {
    const birthDateSplit = inputDate.split(' ');
    return new Date(`${parseInt(birthDateSplit[2])}-${parseInt(birthDateSplit[1])}-${parseInt(birthDateSplit[0])}`);
  } catch (err) {
    return null;
  }
}

/**
 * javaScript: async/await with forEach() implementation, javascript need this to work with promises and forEach()
 * used in bellow checkValidModelIds function
 * @param array 
 * @param callback 
 * @external https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 */
export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * helper function to check if all model ids, fiscalNumber, code or mobilePhones etc are valid ids
 * returns the array of ids, required when we send for ex fiscalNumber's and we required to store it in ambassadors with array of ids and not array of fiscalNumbers
 * required asyncForEach to solve the problem of async/await in arrays
 * use with await ex `await asyncForEach`
 * @param type a model CONVECTOR_MODEL_PATH_* type
 * @param modelName friendlyName used in show errors ex There is no Person(s) with Id(s)
 * @param modelIds array of model ids
 */
export const checkValidModelIds = async (type: string, modelName: string, modelIds: string[]): Promise<string[]> => {
  // check if ambassadors are valid persons
  if (modelIds && modelIds.length > 0) {
    // init invalidIds array, this is used to store invalid ids inside asyncForEach loop
    const invalidIds: string[] = [];
    // return value
    const validIds: string[] = [];
    // require to use await asyncForEach to solve the problem of async/await and forEach()
    await asyncForEach(modelIds, async (id: string) => {
      // replace this with a richQuery, this way we don't need Person model in common, and with that we prevent circular dependencies
      const model: Common = await Common.getById(type, id);
      if (!model) {
        // if is invalid push it to invalidIds
        invalidIds.push(id);
      } else {
        // push model.id and not source id, that can be a fiscalNumber for ex
        validIds.push(model.id);
      }
    })
    // throw exception outside of forEach
    if (invalidIds.length > 0) {
      throw new Error(`There is no ${modelName}(s) with Id(s) (${invalidIds.join(',')})`);
    }

    return validIds;
  }
}

/**
 * remove owner from ambassadors, owner cannot be an ambassador, it owns it, there is no point to be a ambassador
 * @param ambassadors ambassadors array
 * @param ownerId owner uuid
 */
export const removeOwnerFromAmbassadorsArray = (ambassadors: string[], ownerId: string): string[] => {
  if (ambassadors && Array.isArray(ambassadors) && ambassadors.length > 0) {
    const index = ambassadors.indexOf(ownerId);
    if (index !== -1) {
      // splice ownerId
      ambassadors.splice(index, 1);
    }
  }
  // always return original or modified ambassadors
  return ambassadors;
}

/**
 * check if number is decimal, useful to check for integers
 */
export const isDecimal = (input:number): boolean => {
  return (input  % 1 != 0);
}
