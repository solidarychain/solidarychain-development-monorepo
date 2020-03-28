// not used anymore
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
 * javaScript: async/await with forEach() implementation
 * used in person-cc/utils/checkValidPersons
 * @param array 
 * @param callback 
 * @external https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
 */
export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
