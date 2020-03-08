import { Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc';
import { EntityType } from '@solidary-network/common-cc';

export const getEntity = (entityType: EntityType, id: string): Promise<Participant | Person> => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (entityType) {
        case EntityType.Participant:
          const participant = await Participant.getOne(id);
          if (!participant || !participant.identities) {
            throw new Error(`No participant found with id ${id}`);
          }
          resolve(participant);
          break;
        case EntityType.Person:
          const person = await Person.getOne(id);
          if (!person || !person.id) {
            throw new Error(`No person found with id ${id}`);
          }
          resolve(person);
          break;
        default:
          throw new Error(`Invalid input EntityType ${entityType}`);
      }
    } catch (error) {
      // reject promise
      reject(error);
    }
  })
};