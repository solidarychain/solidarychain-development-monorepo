import { Cause } from '@solidary-network/cause-cc';
import { EntityType } from '@solidary-network/common-cc';
import { Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';

// interface duplicated with cause, to prevent circular leave common package clean of dependencies like person-cc and participant-cc
export interface Entity {
  id: string;
  type: EntityType;
  entity: FlatConvectorModel<Participant | Person | Cause>;
}
