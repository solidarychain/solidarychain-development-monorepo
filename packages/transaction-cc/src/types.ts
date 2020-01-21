import { Person } from '@solidary-network/person-cc';
import { Participant } from '@solidary-network/participant-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';

export enum EntityType {
  Participant = 'PARTICIPANT',
  Person = 'PERSON',
  Cause = 'CAUSE'
}

export enum TransactionType {
  Create = 'CREATE',
  Transfer = 'TRANSFER',
}

export enum ResourceType {
  Funds = 'FUNDS',
  Time = 'TIME',
  PhysicalAsset = 'PHYSICAL_ASSET',
  DigitalAsset = 'DIGITAL_ASSET',
}

export interface Entity {
  id: string;
  type: EntityType;
  entity: FlatConvectorModel<Participant | Person>;
}
