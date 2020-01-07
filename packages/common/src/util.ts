// convert comma string float to float ex '1,81' to 1.81
// export const convertStringToFloat = (input: string): number => parseFloat(input.replace(/,/g, '.'));

export const citizenCardDateToIsoDate = (inputDate: string) => {
  try {
    const birthDateSplit = inputDate.split(' ');
    return new Date(`${parseInt(birthDateSplit[2])}-${parseInt(birthDateSplit[1])}-${parseInt(birthDateSplit[0])}`);
  } catch (err) {
    return null;
  }
}
