import { Injectable, Logger } from '@nestjs/common';
import { Asset as AssetConvectorModel } from '@solidary-chain/asset-cc';
import { Cause as CauseConvectorModel } from '@solidary-chain/cause-cc';
import { getEnumValueFromEnumKey } from '@solidary-chain/common-cc';
import { Participant as ParticipantConvectorModel } from '@solidary-chain/participant-cc';
import { Person as PersonConvectorModel } from '@solidary-chain/person-cc';
import { Transaction as TransactionConvectorModel, TransactionType } from '@solidary-chain/transaction-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core';
import { AssetService } from '../asset/asset.service';
import { Asset } from '../asset/models';
import { CauseService } from '../cause/cause.service';
import { Cause } from '../cause/models';
import { PaginationArgs } from '../common/dto';
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
import { appConstants as cc } from '@solidary-chain/common-cc';

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


  async getReactForceData(paginationArgs: PaginationArgs): Promise<GraphData> {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    const participants = await this.findAllParticipants();
    const persons = await this.findAllPersons();
    const causes = await this.findAllCauses();
    const assets = await this.findAllAssets();
    const transactions = await this.findAllTransactions();
    // genesis
    nodes.push({ id: c.GENESIS_NODE_ID, group: NodeType.GENESIS, nodeVal: NodeValue.GENESIS, color: NodeColor.WHITE, label: 'Genesis' });
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
    // assets
    assets.forEach((e: Asset) => {
      nodes.push({ id: e.id, label: `${cc.CONVECTOR_MODEL_PATH_ASSET_NAME}:${e.name}`, ...c.ASSET_NODE_PROPS });
      links.push({ source: (e.owner.entity as unknown as any).id, target: e.id, label: RelationType.CREATED_ASSET, ...c.LINK_COMMON_PROPS });
    });
    // transactions
    const label = '';
    transactions.forEach((e: Transaction) => {
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

    // Logger.log(`assetLinks: [${JSON.stringify(assetLinks, undefined, 2)}]`, DashboardService.name);
    debugger;
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

  async findAllParticipants(paginationArgs?: PaginationArgs): Promise<Participant[]> {
    // get convector model
    const flatConvectorModel: Array<FlatConvectorModel<ParticipantConvectorModel[]>> = await ParticipantControllerBackEnd.getAll();
    // convert flat convector model to convector model
    const convectorModel: ParticipantConvectorModel[] = flatConvectorModel.map((e: ParticipantConvectorModel) => new ParticipantConvectorModel(e));
    // call common find method
    const model: Participant[] = await this.participantService.findBy(convectorModel, paginationArgs) as Participant[];
    // return model
    return model;
  }

  async findAllPersons(paginationArgs?: PaginationArgs): Promise<Person[]> {
    // get convector model
    const flatConvectorModel: Array<FlatConvectorModel<PersonConvectorModel[]>> = await PersonControllerBackEnd.getAll();
    // convert flat convector model to convector model
    const convectorModel: PersonConvectorModel[] = flatConvectorModel.map((e: PersonConvectorModel) => new PersonConvectorModel(e));
    // call common find method
    const model: Person[] = await this.personService.findBy(convectorModel, paginationArgs) as Person[];
    // return model
    return model;
  }

  async findAllCauses(paginationArgs?: PaginationArgs): Promise<Cause[]> {
    // get convector model
    const flatConvectorModel: Array<FlatConvectorModel<CauseConvectorModel[]>> = await CauseControllerBackEnd.getAll();
    // convert flat convector model to convector model
    const convectorModel: CauseConvectorModel[] = flatConvectorModel.map((e: CauseConvectorModel) => new CauseConvectorModel(e));
    // call common find method
    const model: Cause[] = await this.causeService.findBy(convectorModel, paginationArgs) as Cause[];
    // return model
    return model;
  }

  async findAllAssets(paginationArgs?: PaginationArgs): Promise<Asset[]> {
    // get convector model
    const flatConvectorModel: Array<FlatConvectorModel<AssetConvectorModel[]>> = await AssetControllerBackEnd.getAll();
    // convert flat convector model to convector model
    const convectorModel: AssetConvectorModel[] = flatConvectorModel.map((e: AssetConvectorModel) => new AssetConvectorModel(e));
    // call common find method
    const model: Asset[] = await this.assetService.findBy(convectorModel, paginationArgs) as Asset[];
    // return model
    return model;
  }

  async findAllTransactions(paginationArgs?: PaginationArgs): Promise<Transaction[]> {
    // get convector model
    const flatConvectorModel: Array<FlatConvectorModel<TransactionConvectorModel[]>> = await TransactionControllerBackEnd.getAll();
    // convert flat convector model to convector model
    const convectorModel: TransactionConvectorModel[] = flatConvectorModel.map((e: TransactionConvectorModel) => new TransactionConvectorModel(e));
    // call common find method
    const model: Transaction[] = await this.transactionService.findBy(convectorModel, paginationArgs) as Transaction[];
    // return model
    return model;
  }
}
