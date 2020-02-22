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

/**
 * get Participant by Identity/Fingerprint
 */
export const getParticipantByIdentity = async (fingerprint: string): Promise<Participant> => {
  const participant: Participant | Participant[] = await Participant.query(Participant, {
    selector: {
      type: c.CONVECTOR_MODEL_PATH_PARTICIPANT,
      identities: {
        $elemMatch: {
          fingerprint,
          status: true
        }
      }
    }
  });

  if (!!participant && !participant[0].id) {
    throw new Error('Cant find a participant with that fingerprint');
  }
  return participant[0];
}
