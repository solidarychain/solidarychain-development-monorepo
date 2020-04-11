// not used anymore

import { Common } from './common.model';
import {appConstants as c } from './constants';

// convert comma string float to float ex '1,81' to 1.81
export const convertStringToFloat = (input: string): number => parseFloat(input.replace(/,/g, '.'));

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
 * helper function to check if all model ids are valid
 * required asyncForEach to solve the problem of async/await in arrays
 * use with await ex `await asyncForEach`
 * @param type a model CONVECTOR_MODEL_PATH_* type
 * @param modelName friendlyName used in show errors ex There is no Person(s) with Id(s)
 * @param modelIds array of model ids
 */
export const checkValidModelIds = async (type: string, modelName: string, modelIds: string[]) => {
  // check if ambassadors are valid persons
  if (modelIds && modelIds.length > 0) {
    // init invalidIds array, this is used to store invalid ids inside asyncForEach loop
    const invalidIds: string[] = [];
    // require to use await asyncForEach to solve the problem of async/await and forEach()
    await asyncForEach(modelIds, async (id: string) => {
      // replace this with a richQuery, this way we don't need Person model in common, and with that we prevent circular dependencies
      const model: Common = await Common.getById(type, id);
      if (!model) {
        // if is invalid push it to invalidIds
        invalidIds.push(id);
      }
    })
    // throw exception outside of forEach
    if (invalidIds.length > 0) {
      throw new Error(`There is no ${modelName}(s) with Id(s) (${invalidIds.join(',')})`);
    }
  }
}
