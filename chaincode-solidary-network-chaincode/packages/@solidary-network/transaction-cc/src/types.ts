import { Person } from '@solidary-network/person-cc';
import { Participant } from '@solidary-network/participant-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { EntityType } from '@solidary-network/common';

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

// duplicated with cause, to prevent circular leave common package clean of dependencies like person-cc and participant-cc
export interface Entity {
  id: string;
  type: EntityType;
  entity: FlatConvectorModel<Participant | Person>;
}
