import { Cause } from '@solidary-chain/cause-cc';
import { EntityType } from '@solidary-chain/common-cc';
import { Participant } from '@solidary-chain/participant-cc';
import { Person } from '@solidary-chain/person-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';

// interface Entity and getEntity() function duplicated with asset, cause and transaction, to prevent circular dependencies, 
// this way we leave common package clean of dependencies like person-cc and participant-cc
export interface Entity {
  id: string;
  type: EntityType;
  entity: FlatConvectorModel<Participant | Person | Cause>;
}
