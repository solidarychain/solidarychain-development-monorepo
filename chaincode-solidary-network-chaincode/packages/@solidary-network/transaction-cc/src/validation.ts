import * as yup from 'yup';
import { currencyCodesISO4217 } from '@solidary-network/common-cc';
import { TransactionType, ResourceType } from './enums';

export const transactionTypeSchema = yup
  .mixed<TransactionType.Create | TransactionType.Transfer>()
  .oneOf([TransactionType.Create, TransactionType.Transfer])
  .required()

export const resourceTypeSchema = yup
  .mixed<ResourceType.Funds | ResourceType.Time | ResourceType.PhysicalAsset | ResourceType.DigitalAsset>()
  .oneOf([ResourceType.Funds, ResourceType.Time, ResourceType.PhysicalAsset, ResourceType.DigitalAsset])
  .required();

// using custom login with .test()
export const currencySchema = yup
  .string().length(3, '3 characters is required')
  // test-name is used by Yup internally
  .test('test-name', 'iso 4217 currency code is required',
    (value) => (currencyCodesISO4217.indexOf(value) > 0))
  .required();
