import { Injectable, Logger } from '@nestjs/common';
import { Asset as AssetConvectorModel } from '@solidary-chain/asset-cc';
import { Cause as CauseConvectorModel } from '@solidary-chain/cause-cc';
import { appConstants as cc } from '@solidary-chain/common-cc';
import { Participant as ParticipantConvectorModel } from '@solidary-chain/participant-cc';
import { Person as PersonConvectorModel } from '@solidary-chain/person-cc';
import { Transaction as TransactionConvectorModel } from '@solidary-chain/transaction-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { AssetService } from '../asset/asset.service';
import { Asset } from '../asset/models';
import { CauseService } from '../cause/cause.service';
import { Cause } from '../cause/models';
import { PaginationArgs } from '../common/dto';
import CurrentUserPayload from '../common/types/current-user-payload';
import { AssetControllerBackEnd, CauseControllerBackEnd, ParticipantControllerBackEnd, PersonControllerBackEnd, TransactionControllerBackEnd } from '../convector';
import { Participant } from '../participant/models';
import { ParticipantService } from '../participant/participant.service';
import { Person } from '../person/models';
import { PersonService } from '../person/person.service';
import { Transaction } from '../transaction/models';
import { TransactionService } from '../transaction/transaction.service';
import { appConstants as c } from './constants';
import { NodeColor, NodeType, NodeValue, RelationType } from './enums/graph-data';
import { GraphData, GraphLink, GraphNode } from './models';

@Injectable()
export class DashboardService {
  constructor(
    private readonly participantService: ParticipantService,
    private readonly personService: PersonService,
    private readonly causeService: CauseService,
    private readonly assetService: AssetService,
    private readonly transactionService: TransactionService,
  ) {
  }
  // nodes: [...nodes, { id, label: `id${id}`, nodeVal: randomWidth(), group }],
  // links: [...links, { source: id, target, label: `${id}>${target}`, group }]

  // export const graphData: IState = {
  //   nodes: [
  //     { id: 0, group: NodeType.GENESIS, nodeVal: genesisNodeValue, color: NodeColor.WHITE, label: 'Genesis Node' },
  //     // connected directly to genesis
  //     { id: 1, group: NodeType.PARTICIPANT, nodeVal: participantsNodeValue, color: NodeColor.BLUE, label: 'World Food program' },
  //     { id: 2, group: NodeType.PERSON, nodeVal: personNodeValue, color: NodeColor.PINK, label: 'John Doe' },
  //     { id: 3, group: NodeType.PERSON, nodeVal: personNodeValue, color: NodeColor.PINK, label: 'jane Dow' },
  //     // connected to entities person and participants
  //     { id: 4, group: NodeType.CAUSE, nodeVal: causeNodeValue, label: 'World food program cause' },
  //     { id: 5, group: NodeType.ASSET, nodeVal: assetNodeValue, label: 'Wheel chair' },
  //     // transaction
  //     { id: 6, group: NodeType.TRANSACTION, nodeVal: transactionNodeValue, label: 'Transaction' },
  //     { id: 7, group: NodeType.TRANSACTION, nodeVal: transactionNodeValue, label: 'Transaction' },
  //   ],
  //   links: [
  //     { source: 1, target: 0, label: 'HAS_BORN', group: TransactionType.FUNDS },
  //     { source: 2, target: 0, label: 'HAS_BORN', group: TransactionType.FUNDS },
  //     { source: 3, target: 0, label: 'HAS_BORN', group: TransactionType.FUNDS },
  //     // cause
  //     { source: 1, target: 4, label: 'CREATED_CAUSE' },
  //     // input person transactions to
  //     { source: 2, target: 6, label: 'TRANSACTION_TO', linkWidth: 1 },
  //     { source: 3, target: 7, label: 'TRANSACTION_TO', linkWidth: 3 },
  //     // output transactions to
  //     { source: 6, target: 4, label: 'TRANSACTION_FROM', linkWidth: 1 },
  //     { source: 7, target: 4, label: 'TRANSACTION_FROM', linkWidth: 3 },
  //   ],
  // };


  async getReactForceData(paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<GraphData> {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const transactionParticipants = [];
    const transactionPersons = [];
    const transactionCauses = [];

    // start getting all transactions and assets
    const transactions = await this.findAllTransactions(null, user);
    const assets = await this.findAllAssets(null, user);

    // user don't have access to all entities, because of privileges, we must create filters for for missing entities abd use that filters to get participants, person and causes, they must exist in nodes array
    const pushToTransactionEntities = (inputOutputType: string) => transactions.forEach((e: Transaction) => {
      switch (e[inputOutputType].entity.type) {
        case cc.CONVECTOR_MODEL_PATH_PARTICIPANT:
          if (!transactionParticipants.includes(e[inputOutputType].entity.id)) { transactionParticipants.push(e[inputOutputType].entity.id); };
          break;
        case cc.CONVECTOR_MODEL_PATH_PERSON:
          if (!transactionPersons.includes(e[inputOutputType].entity.id)) { transactionPersons.push(e[inputOutputType].entity.id); };
          break;
        case cc.CONVECTOR_MODEL_PATH_CAUSE:
          if (!transactionCauses.includes(e[inputOutputType].entity.id)) { transactionCauses.push(e[inputOutputType].entity.id); };
          break;
      }
    });
    pushToTransactionEntities('input');
    pushToTransactionEntities('output');
    /// generate entity filters
    const participantsFilter = { filter: { $or: [...transactionParticipants.map((e: string) => { return { _id: e } })] } };
    const personsFilter = { filter: { $or: [...transactionPersons.map((e: string) => { return { _id: e } })] } };
    const causesFilter = { filter: { $or: [...transactionCauses.map((e: string) => { return { _id: e } })] } };
    // must pass admin user with custom filters to have access to user unprivileged entities
    // const participants = await this.findAllParticipants(participantsFilter, null, cc.CURRENT_USER_ADMIN_ROLE);
    // const persons = await this.findAllPersons(personsFilter, null, cc.CURRENT_USER_ADMIN_ROLE);
    // const causes = await this.findAllCauses(causesFilter, null, cc.CURRENT_USER_ADMIN_ROLE);
    let participants = [];
    let persons = [];
    let causes = [];
    await Promise.all([
      this.findAllParticipants(participantsFilter, null, cc.CURRENT_USER_ADMIN_ROLE),
      this.findAllPersons(personsFilter, null, cc.CURRENT_USER_ADMIN_ROLE),
      this.findAllCauses(causesFilter, null, cc.CURRENT_USER_ADMIN_ROLE)
    ])
      .then((result) => {
        participants = result[0];
        persons = result[1];
        causes = result[2];
      })
      .catch(error => {
        Logger.error(`Error in promises ${error}`, null, DashboardService.name);
      })

    // genesis
    nodes.push({ id: c.GENESIS_NODE_ID, group: NodeType.GENESIS, nodeVal: NodeValue.GENESIS, color: NodeColor.WHITE, label: 'Genesis' });
    // transactions
    const label = '';
    transactions.forEach((e: Transaction) => {
      // TODO
      // switch (e.transactionType) {
      //   case TransactionType.TransferFunds:
      //     label = `${}`;
      //     break;
      //   case TransactionType.TransferVolunteeringHours:
      //     break;
      //   case TransactionType.TransferGoods:
      //     break;
      //   case TransactionType.TransferAsset:
      //     break;
      //   default:
      //     break;
      // }
      nodes.push({ id: e.id, label: `${cc.CONVECTOR_MODEL_PATH_TRANSACTION_NAME}:${e.transactionType}`, ...c.TRANSACTION_NODE_PROPS });
      links.push({ source: (e.input.entity as unknown as any).id, target: e.id, label: RelationType.CREATED_TRANSACTION, ...c.LINK_COMMON_PROPS });
      links.push({ source: e.id, target: (e.output.entity as unknown as any).id, label: RelationType.CREATED_TRANSACTION, ...c.LINK_COMMON_PROPS });
    });
    // assets
    assets.forEach((e: Asset) => {
      nodes.push({ id: e.id, label: `${cc.CONVECTOR_MODEL_PATH_ASSET_NAME}:${e.name}`, ...c.ASSET_NODE_PROPS });
      links.push({ source: (e.owner.entity as unknown as any).id, target: e.id, label: RelationType.CREATED_ASSET, ...c.LINK_COMMON_PROPS });
    });
    // participants
    participants.forEach((e: Participant) => {
      nodes.push({ id: e.id, label: `${cc.CONVECTOR_MODEL_PATH_PARTICIPANT_NAME}:${e.name}`, ...c.PARTICIPANT_NODE_PROPS });
      links.push({ source: e.id, target: c.GENESIS_NODE_ID, label: RelationType.HAS_BORN, ...c.LINK_COMMON_PROPS });
    });
    // persons
    persons.forEach((e: Person) => {
      nodes.push({ id: e.id, label: `${cc.CONVECTOR_MODEL_PATH_PERSON_NAME}:${e.username}`, ...c.PERSON_NODE_PROPS });
      links.push({ source: e.id, target: c.GENESIS_NODE_ID, label: RelationType.HAS_BORN, ...c.LINK_COMMON_PROPS });
    });
    // causes
    causes.forEach((e: Cause) => {
      nodes.push({ id: e.id, label: `${cc.CONVECTOR_MODEL_PATH_CAUSE_NAME}:${e.name}`, ...c.CAUSE_NODE_PROPS });
      links.push({ source: (e.input.entity as unknown as any).id, target: e.id, label: RelationType.CREATED_CAUSE, ...c.LINK_COMMON_PROPS });
    });

    // Logger.log(`assetLinks: [${JSON.stringify(assetLinks, undefined, 2)}]`, DashboardService.name);
    return {
      nodes,
      links,
      // nodes: [
      //   { id: '0', group: NodeType.GENESIS, nodeVal: NodeValue.GENESIS, color: NodeColor.WHITE, label: 'Genesis Node' },
      //   // connected directly to genesis
      //   { id: '1', group: NodeType.PARTICIPANT, nodeVal: NodeValue.PARTICIPANTS, color: NodeColor.BLUE, label: 'World Food program' },
      //   { id: '2', group: NodeType.PERSON, nodeVal: NodeValue.PERSON, color: NodeColor.PINK, label: 'John Doe' },
      //   { id: '3', group: NodeType.PERSON, nodeVal: NodeValue.PERSON, color: NodeColor.PINK, label: 'jane Dow' },
      //   // connected to entities person and participants
      //   { id: '4', group: NodeType.CAUSE, nodeVal: NodeValue.CAUSE, label: 'World food program cause' },
      //   { id: '5', group: NodeType.ASSET, nodeVal: NodeValue.ASSET, label: 'Wheel chair' },
      //   // transaction
      //   { id: '6', group: NodeType.TRANSACTION, nodeVal: NodeValue.TRANSACTION, label: 'Transaction' },
      //   { id: '7', group: NodeType.TRANSACTION, nodeVal: NodeValue.TRANSACTION, label: 'Transaction' },
      // ],
      // links: [
      //   { source: '1', target: '0', label: 'HAS_BORN', group: TransactionType.FUNDS },
      //   { source: '2', target: '0', label: 'HAS_BORN', group: TransactionType.FUNDS },
      //   { source: '3', target: '0', label: 'HAS_BORN', group: TransactionType.FUNDS },
      //   // cause
      //   { source: '1', target: '4', label: RelationType.CREATED_CAUSE },
      //   // input person transactions to
      //   { source: '2', target: '6', label: RelationType.TRANSACTION_TO, linkWidth: 1 },
      //   { source: '3', target: '7', label: RelationType.TRANSACTION_TO, linkWidth: 3 },
      //   // output transactions to
      //   { source: '6', target: '4', label: RelationType.TRANSACTION_TO, linkWidth: 1 },
      //   { source: '7', target: '4', label: RelationType.TRANSACTION_TO, linkWidth: 3 },
      // ],
    };
  }

  /**
   * sync with packages/server-graphql/src/MODEL/MODEL.service.ts findAll
   */
  async findAllTransactions(paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Transaction[]> {
    // get convector model
    const fabricModel: Array<FlatConvectorModel<TransactionConvectorModel>> = await TransactionControllerBackEnd.getAll(user) as TransactionConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: TransactionConvectorModel[] = fabricModel.map((e: TransactionConvectorModel) => new TransactionConvectorModel(e));
    // call common find method
    return await this.transactionService.findBy(convectorModel, paginationArgs) as Transaction[];
  }

  /**
   * sync with packages/server-graphql/src/MODEL/MODEL.service.ts findAll
   */
  async findAllAssets(paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Asset[]> {
    // get convector model
    const fabricModel: Array<FlatConvectorModel<AssetConvectorModel>> = await AssetControllerBackEnd.getAll(user) as AssetConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: AssetConvectorModel[] = fabricModel.map((e: AssetConvectorModel) => new AssetConvectorModel(e));
    // call common find method
    return await this.assetService.findBy(convectorModel, paginationArgs) as Asset[];
  }

  async findAllParticipants(queryParams: { filter?: any, sort?: any }, paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Participant[]> {
    // get convector model
    const fabricModel: Array<FlatConvectorModel<ParticipantConvectorModel>> = await ParticipantControllerBackEnd.getComplexQuery(queryParams, user) as ParticipantConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: ParticipantConvectorModel[] = fabricModel.map((e: ParticipantConvectorModel) => new ParticipantConvectorModel(e));
    // call common find method
    return await this.participantService.findBy(convectorModel, paginationArgs) as Participant[];
  }

  async findAllPersons(queryParams: { filter?: any, sort?: any }, paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Person[]> {
    // get convector model
    const fabricModel: Array<FlatConvectorModel<PersonConvectorModel>> = await PersonControllerBackEnd.getComplexQuery(queryParams, user) as PersonConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: PersonConvectorModel[] = fabricModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    return await this.personService.findBy(convectorModel, paginationArgs) as Person[];
  }

  async findAllCauses(queryParams: { filter?: any, sort?: any }, paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Cause[]> {
    // get convector model
    const fabricModel: Array<FlatConvectorModel<CauseConvectorModel>> = await CauseControllerBackEnd.getComplexQuery(queryParams, user) as CauseConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: CauseConvectorModel[] = fabricModel.map((e: CauseConvectorModel) => new CauseConvectorModel(e));
    // call common find method
    return await this.causeService.findBy(convectorModel, paginationArgs) as Cause[];
  }
}
