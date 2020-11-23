import { LinkColor, NodeColor, NodeType, NodeValue } from './enums';

const GENESIS_NODE_ID = '00000000-0000-0000-0000-000000000000';
const PARTICIPANT_NODE_PROPS = { group: NodeType.PARTICIPANT, nodeVal: NodeValue.PARTICIPANTS, color: NodeColor.BLUE };
const PERSON_NODE_PROPS = { group: NodeType.PERSON, nodeVal: NodeValue.PERSON, color: NodeColor.PINK };
const CAUSE_NODE_PROPS = { group: NodeType.CAUSE, nodeVal: NodeValue.CAUSE };
const ASSET_NODE_PROPS = { group: NodeType.ASSET, nodeVal: NodeValue.ASSET };
const TRANSACTION_NODE_PROPS = { group: NodeType.TRANSACTION, nodeVal: NodeValue.TRANSACTION };
const LINK_COMMON_PROPS = { color: LinkColor.DARK_GREY };

export const appConstants = {
  GENESIS_NODE_ID,
  PARTICIPANT_NODE_PROPS,
  PERSON_NODE_PROPS,
  CAUSE_NODE_PROPS,
  ASSET_NODE_PROPS,
  TRANSACTION_NODE_PROPS,
  LINK_COMMON_PROPS,
};
