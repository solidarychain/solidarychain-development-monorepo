export enum NodeType {
  // must be a number to use in group
  GENESIS,
  PARTICIPANT,
  PERSON,
  CAUSE,
  ASSET,
  TRANSACTION,
}

export enum NodeValue {
  GENESIS = 1,
  PARTICIPANTS = 5,
  PERSON = 10,
  CAUSE = 15,
  ASSET = 20,
  TRANSACTION = 25,
}

export enum TransactionType {
  FUNDS,
  GOODS,
  VOLUNTARY_HOURS,
  SERVICE,
}

export enum RelationType {
  HAS_BORN = 'HAS_BORN',
  CREATED_CAUSE = 'CREATED_CAUSE',
  CREATED_ASSET = 'CREATED_ASSET',
  CREATED_TRANSACTION = 'CREATED_TRANSACTION',
  TRANSACTION_TO_ENTITY = 'TRANSACTION_TO_ENTITY',
}

export enum NodeColor {
  WHITE = '#ffffff',
  RED = '#ff0000',
  ORANGE = '#ffa500',
  YELLOW = '#ffff00',
  GREEN = '#008000',
  BLUE = '#0000ff',
  PURPLE = '#4b0082',
  PINK = '#ee82ee',
}

export enum LinkColor {
  DARK_GREY = '#282828',
}
