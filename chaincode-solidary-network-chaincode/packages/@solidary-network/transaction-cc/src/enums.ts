export enum UnitType {
  Funds = 'FUNDS',
  Time = 'TIME',
  Asset = 'ASSET',
}

export enum TransactionType {
  // create a new asset, cause,...
  Create = 'CREATE',
  // transfer to person, organization, cause
  Transfer = 'TRANSFER',
}

export enum ResourceType {
  Funds = 'FUNDS',
  Time = 'TIME',
  // common with packages/asset-cc/src/enums.ts
  PhysicalAsset = 'PHYSICAL_ASSET',
  DigitalAsset = 'DIGITAL_ASSET',
}
