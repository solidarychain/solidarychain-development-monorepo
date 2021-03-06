export enum AssetType {
  // common with packages/transaction-cc/src/enums.ts: prevent circular dependency
  PhysicalAsset = 'PHYSICAL_ASSET',
  DigitalAsset = 'DIGITAL_ASSET',
  DigitalVoucher = 'DIGITAL_VOUCHER',
  PhysicalVoucher = 'PHYSICAL_VOUCHER',
}
