import * as yup from 'yup';
import { Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc';
import { EntityType } from './types';
import { FlatConvectorModel } from '@worldsibu/convector-core';

// [schema objects](https://github.com/jquense/yup#extending-schema-types)
export const entitySchema = yup.object().shape({
  id: yup
    .string()
    .required(),
  type: yup
    .mixed<EntityType.Participant | EntityType.Person | EntityType.Cause>()
    .oneOf([EntityType.Participant, EntityType.Person, EntityType.Cause]),
  output: yup
    // TODO: Add cause Model
    .mixed<FlatConvectorModel<Participant> | FlatConvectorModel<Person>/* | FlatConvectorModel<Cause>*/>()
});
