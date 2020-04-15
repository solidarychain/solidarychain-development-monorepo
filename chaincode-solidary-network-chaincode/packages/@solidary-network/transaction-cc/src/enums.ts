// Not used YET
// export enum UnitType {
//   Fund = 'FUND',
//   VolunteeringHours = 'VOLUNTEERING_HOUR',
//   Asset = 'ASSET',
//   Goods = 'GOODS',
// }

export enum TransactionType {
  // when funds, assets and goods are born/start living in the system
  DonateFunds = 'DONATE_FUNDS', // (balance)
  DonateVolunteeringHours = 'DONATE_VOLUNTEERING_HOURS', // (balance)
  DonateGoods = 'DONATE_GOODS',
  DonateAssets = 'DONATE_ASSETS',
  // transfer funds, assets and goods to/from organization, person, cause
  TransferFunds = 'TRANSFER_FUNDS',
  TransferGoods = 'TRANSFER_GOODS',
  TransferAsset = 'TRANSFER_ASSET',
}

export enum ResourceType {
  Funds = 'FUNDS', // (balance)
  VolunteeringHours = 'VOLUNTEERING_HOURS', // (balance)
  GenericGoods = 'GENERIC_GOODS',
  // common with packages/asset-cc/src/enums.ts: prevent circular dependency
  PhysicalAsset = 'PHYSICAL_ASSET',
  DigitalAsset = 'DIGITAL_ASSET',
}
