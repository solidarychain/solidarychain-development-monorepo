import { Person } from '@solidary-chain/person-cc';
import { Participant } from '@solidary-chain/participant-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { EntityType } from '@solidary-chain/common-cc';
import { Cause } from './cause.model';

// interface Entity and getEntity() function duplicated with asset, cause and transaction, to prevent circular dependencies, 
// this way we leave common package clean of dependencies like person-cc and participant-cc
export interface Entity {
  id: string;
  type: EntityType;
  entity: FlatConvectorModel<Participant | Person | Cause>;
}
