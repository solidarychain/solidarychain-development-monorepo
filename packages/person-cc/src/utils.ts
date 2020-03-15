import * as bcrypt from 'bcrypt';
import { appConstants as c } from '@solidary-network/common-cc';
import { Participant } from '@solidary-network/participant-cc';

// duplicated with 
// packages/person-cc/src/utils.ts
// packages/participant-cc/src/utils.ts

const bcryptSaltRounds: number = 10;

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcryptSaltRounds);
};

