import * as bcrypt from 'bcrypt';

const bcryptSaltRounds: number = 10;

export const hashPassword = (passWord: string): string => {
  return bcrypt.hashSync(passWord, bcryptSaltRounds);
};
