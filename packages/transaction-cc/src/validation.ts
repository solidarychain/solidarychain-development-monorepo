import * as yup from 'yup';
import { Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc';
import { EntityType, TransactionType, ResourceType } from './types';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { currencyCodesISO4217 } from '@solidary-network/common/dist/src/data';

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

export const transactionTypeSchema = yup
  .mixed<TransactionType.Create | TransactionType.Transfer>()
  .oneOf([TransactionType.Create, TransactionType.Transfer]);

export const resourceTypeSchema = yup
  .mixed<ResourceType.Funds | ResourceType.Time | ResourceType.PhysicalAsset | ResourceType.DigitalAsset>()
  .oneOf([ResourceType.Funds, ResourceType.Time, ResourceType.PhysicalAsset, ResourceType.DigitalAsset]);

// using custom login with .test()
export const currencySchema = yup
  .string().length(3, '3 characters is required')
  // test-name is used by Yup internally
  .test('test-name', 'iso 4217 currency code is required',
    (value) => (currencyCodesISO4217.indexOf(value) > 0));
