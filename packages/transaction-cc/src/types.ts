import { Person } from '@solidary-network/person-cc';
import { Participant } from '@solidary-network/participant-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';

export enum EntityType {
  Participant = 'PARTICIPANT',
  Person = 'PERSON',
  Cause = 'CAUSE'
}

export interface Entity {
  id: string;
  type: EntityType;
  output: FlatConvectorModel<Participant | Person>;
}
