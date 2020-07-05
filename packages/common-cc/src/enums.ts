export enum UserRoles {
  User = 'USER',
  Admin = 'ADMIN'
}

export enum EntityType {
  Participant = 'com.chain.solidary.model.participant',
  Person = 'com.chain.solidary.model.person',
  Cause = 'com.chain.solidary.model.cause',
}

export enum ChaincodeEvent {
  AssetCreatedEvent = "AssetCreatedEvent",
  AssetUpdatedEvent = "AssetUpdatedEvent",
  CauseCreatedEvent = "CauseCreatedEvent",
  CauseUpdatedEvent = "CauseUpdatedEvent",
  // Participant
  ParticipantCreatedEvent = "ParticipantCreatedEvent",
  ParticipantUpdatedEvent = "ParticipantUpdatedEvent",
  ParticipantChangeIdentityEvent = 'ParticipantChangeIdentityEvent',
  // Person
  PersonCreatedEvent = "PersonCreatedEvent",
  PersonUpdatedEvent = "PersonUpdatedEvent",
  PersonUpdatePasswordEvent = 'PersonUpdatePasswordEvent',
  PersonUpdateProfileEvent = 'PersonUpdateProfileEvent',
  PersonUpdateRolesEvent = 'PersonUpdateRolesEvent',
  PersonUpsertCitizenCardEvent = 'PersonUpsertCitizenCardEvent',
  PersonAddAttributeEvent = 'PersonAddAttributeEvent',
  // Transaction
  TransactionCreatedEvent = "TransactionCreatedEvent",
  TransactionUpdatedEvent = "TransactionUpdatedEvent",
  TransactionAssetChangeOwnerEvent = 'TransactionAssetChangeOwnerEvent',
}
