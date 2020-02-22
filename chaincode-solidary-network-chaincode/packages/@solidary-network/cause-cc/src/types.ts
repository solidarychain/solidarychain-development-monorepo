import { Person } from '@solidary-network/person-cc';
import { Participant } from '@solidary-network/participant-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { EntityType } from '@solidary-network/common-cc';
import { Cause } from '.';

// interface duplicated with cause, to prevent circular leave common package clean of dependencies like person-cc and participant-cc
export interface Entity {
  id: string;
  type: EntityType;
  entity: FlatConvectorModel<Participant | Person | Cause>;
}
