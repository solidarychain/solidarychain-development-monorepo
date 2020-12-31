import * as yup from 'yup';
import { currencyCodesISO4217 } from '@solidary-chain/common-cc';
import { TransactionType, ResourceType } from './enums';

export const transactionTypeSchema = yup
  // seems that .mixed<type | type...>() syntax changed from...to .mixed()
  // .mixed<TransactionType.Create | TransactionType.Transfer>()
  .mixed()
  .oneOf([
    TransactionType.TransferFunds,
    TransactionType.TransferVolunteeringHours,
    TransactionType.TransferGoods,
    TransactionType.TransferAsset,
  ])
  .required();

export const resourceTypeSchema = yup
  // seems that .mixed<type | type...>() syntax changed from...to .mixed()
  // .mixed<ResourceType.Funds | ResourceType.Time | ResourceType.PhysicalAsset | ResourceType.DigitalAsset>()
  .mixed()
  .oneOf([
    ResourceType.Funds,
    ResourceType.VolunteeringHours,
    ResourceType.GenericGoods,
    ResourceType.PhysicalAsset,
    ResourceType.DigitalAsset,
    ResourceType.PhysicalVoucher,
    ResourceType.DigitalVoucher,
  ])
  .required();

// using custom login with .test()
export const currencySchema = yup
  .string()
  // .length deprecated?
  // .length(3, '3 characters is required')
  // test-name is used by Yup internally
  .test('test-name', 'iso 4217 currency code is required',
    (value) => (currencyCodesISO4217.indexOf(value) > 0))
    .nullable();
  // not it can be null, ex when work with volunteeringHours for ex
  // .required();
