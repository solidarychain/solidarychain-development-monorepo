import * as yup from 'yup';
import { AssetType } from './enums';

export const assetTypeSchema = yup
  // seems that .mixed<type | type...>() syntax changed from...to .mixed()
  // .mixed<ResourceType.Funds | ResourceType.Time | ResourceType.PhysicalAsset | ResourceType.DigitalAsset>()
  .mixed()
  .oneOf([AssetType.PhysicalAsset, AssetType.DigitalAsset, AssetType.PhysicalAsset, AssetType.PhysicalVoucher])
  .required();
