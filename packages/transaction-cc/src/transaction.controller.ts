import { Asset } from '@solidary-chain/asset-cc';
import { Cause } from '@solidary-chain/cause-cc';
import { appConstants as c, ChaincodeEvent, EntityType, isDecimal } from '@solidary-chain/common-cc';
import { getParticipantByIdentity, Participant } from '@solidary-chain/participant-cc';
import { Person } from '@solidary-chain/person-cc';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { ResourceType, TransactionType } from './enums';
import { Transaction } from './transaction.model';
import { checkUniqueField, getEntity, processTransferGoodsInput } from './utils';

@Controller('transaction')
export class TransactionController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Transaction)
    transaction: Transaction,
  ) {
    debugger;
    // use '' to prevent undefined when empty
    let debugMessage: string = '';

    // check unique fields
    await checkUniqueField('_id', transaction.id, true);

    // shared protections for all transaction types

    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }
    // get loggedPerson from loggedPersonId
    const loggedPerson: Person = await Person.getById(transaction.loggedPersonId);
    if (!!loggedPerson && !loggedPerson.id) {
      throw new Error('There is no logged user with that identity');
    }

    // participant
    transaction.participant = participant;
    // assign input/output
    transaction.input.entity = await getEntity(transaction.input.type, transaction.input.id);
    transaction.output.entity = await getEntity(transaction.output.type, transaction.output.id);

    // ambassador protection: if entity is participant or cause, the logged user must be a ambassador else throw error
    if (transaction.input.type === EntityType.Participant || transaction.input.type === EntityType.Cause) {
      if (!(transaction.input.entity as Participant | Cause).ambassadors || !(transaction.input.entity as Participant | Cause).ambassadors.find((id: string) => id === loggedPerson.id)) {
        throw new Error(`Logged user must be an ambassador of input entity`);
      }
    }

    // protection required loggedPersonId
    if (!transaction.loggedPersonId) {
      throw new Error(`You must supply a loggedPersonId in transfers`);
    }

    // protection check if ownerPerson exists 
    if (!loggedPerson && !loggedPerson.id) {
      throw new Error(`There is no person with Id '${transaction.loggedPersonId}'`);
    }

    // protect if any input/output has a missing id ot type
    if (!transaction.input.id || !transaction.output.id || !transaction.input.type || !transaction.output.type) {
      throw new Error('You must supply valid values for transaction id and type on input/output parameters!');
    }

    // protect from transfer from same input has output
    if (transaction.input.id === transaction.output.id && transaction.input.type === transaction.output.type) {
      throw new Error('You can\'t transfer from input to same output entity, you must transfer from input to a different output entity!');
    }

    // protection for positive and integer quantity when working TransactionType.TransferFunds or TransactionType.TransferVolunteeringHours
    if (transaction.transactionType === TransactionType.TransferFunds || transaction.transactionType === TransactionType.TransferVolunteeringHours) {
      if (!transaction.quantity || transaction.quantity <= 0) {
        throw new Error(`You must supply a quantity greater than 0 when work with transactionType: ${TransactionType.TransferFunds} or ${TransactionType.TransferVolunteeringHours}`);
      }
      if (!transaction.quantity || isDecimal(transaction.quantity)) {
        throw new Error(`You must supply a integer quantity when work with transactionType: ${TransactionType.TransferFunds} or ${TransactionType.TransferVolunteeringHours}`);
      }
    }

    // check if is a valid input and output from entity
    if (!transaction.input.entity) {
      const entityType: string = transaction.input.type.replace(`${c.CONVECTOR_MODEL_PATH_PREFIX}.`, '');
      throw new Error(`There is no entity of type '${entityType}' with Id '${transaction.input.id}'`);
    }
    // TODO: create entity if has fiscalNumber defined
    if (!transaction.output.entity) {
      const entityType: string = transaction.output.type.replace(`${c.CONVECTOR_MODEL_PATH_PREFIX}.`, '');
      throw new Error(`There is no entity of type '${entityType}' with Id '${transaction.output.id}'`);
    }

    // protection for funds + causes amount funds balance violation
    // tslint:disable-next-line: max-line-length
    if (transaction.transactionType === TransactionType.TransferFunds && transaction.input.type === EntityType.Cause && !(transaction.input.entity as Cause).fundsBalance) {
      throw new Error(`Balance violation! when work with causes, current cause don't have funds for transaction. current funds balance is 0`);
    }
    if (transaction.transactionType === TransactionType.TransferFunds && transaction.input.type === EntityType.Cause && (transaction.input.entity as Cause).fundsBalance.balance < transaction.quantity) {
      // tslint:disable-next-line: max-line-length
      throw new Error(`Balance violation! when work with causes, you must supply a total amount lesser or equal than current funds balance. current funds balance is ${(transaction.input.entity as Cause).fundsBalance.balance}`);
    }

    // mode: TransactionType.TransferAsset

    // detect if is a transfer type, and asset resourceType
    if (transaction.transactionType === TransactionType.TransferAsset && (
      transaction.resourceType === ResourceType.PhysicalAsset || transaction.resourceType === ResourceType.DigitalAsset
    )) {
      if (!transaction.assetId) {
        throw new Error(`You must supply a assetId when transfer assets of type '${transaction.resourceType}'`);
      } else {
        // get asset
        const asset: Asset = await Asset.getOne(transaction.assetId);
        if (!!asset && !asset.id) {
          throw new Error(`There is no asset with Id (${transaction.assetId})`);
        }

        // protection check if asset resourceType is equal to payload.resourceType
        if (transaction.resourceType !== (asset.assetType as unknown as ResourceType)) {
          throw new Error(`Transaction resourceType '${transaction.resourceType}' is different from asset resourceType '${asset.assetType}', you can't change resourceType in transfers`);
        }

        // protection check if transaction input owner is the same as asset owner and same type, if one is different throw exception
        if (transaction.input.id != (asset.owner.entity as any).id || transaction.input.type != (asset.owner.entity as any).type) {
          // debugMessage = `transaction.input.id: ${transaction.input.id} != asset.owner.entity: ${(asset.owner.entity as any).id} && transaction.input.type: ${transaction.input.type} != asset.owner.entity: ${(asset.owner.entity as any).type}`;
          throw new Error(`Transaction input owner is not the owner of the asset${debugMessage}`);
        }

        // protection check if loggedPerson is the owner or if loggedPerson in in authorized ambassador's
        if (transaction.input.id != loggedPerson.id && !asset.ambassadors.includes(loggedPerson.id)) {
          // debugMessage = `:debugMessage:transaction.input.id: ${transaction.input.id} != loggedPerson.id: ${loggedPerson.id} (${transaction.input.id != loggedPerson.id}}) - ${JSON.stringify(asset.ambassadors)}:${asset.ambassadors.includes(loggedPerson.id)}:(${!asset.ambassadors.includes(loggedPerson.id)})`;
          throw new Error(`Logged person is not the owner of the asset, or is not an authorized asset ambassador${debugMessage}`);
        }

        // REMOVED: not quantity and currency are optional, this way we can transfer assets and funds, like sell the asset
        // // protection invalid properties are presented when working with TransferGoods
        // if (transaction.quantity || transaction.currency) {
        //   throw new Error(`Detected invalid properties quantity and currency when working with transactionType: ${transaction.transactionType}!`);
        // }

        // assign new owner id and type
        asset.owner.entity = transaction.output.entity;
        // assign which asset was transferred to transaction
        transaction.assetId = asset.id;
        // delete the old ambassadors, else we leave old ones, new owner must nominate new ambassadors
        asset.ambassadors = [];
        // save asset
        // TODO: add event
        await asset.save();
      }
    }

    // mode: TransactionType.TransferGoods

    else if (transaction.transactionType === TransactionType.TransferGoods) {
      // protection check if TransactionType.TransferGoods has valid ResourceType
      if (transaction.resourceType !== ResourceType.GenericGoods) {
        throw new Error(`You must use a valid combination of TransactionType: ${TransactionType.TransferGoods} with a valid ResourceType ex: ${ResourceType.GenericGoods}`);
      }
      // protection check if TransactionType.TransferGoods has valid goods item array
      if (!transaction.goodsInput || !Array.isArray(transaction.goodsInput) || transaction.goodsInput.length <= 0) {
        throw new Error(`You must have a valid goods item array when work with transactionType: ${transaction.transactionType}`);
      }
      // protection invalid properties are presented when working with TransferGoods
      if (transaction.quantity || transaction.currency || transaction.assetId) {
        throw new Error(`Detected invalid properties when working with transactionType: ${transaction.transactionType}. Invalid properties are: quantity, currency and assetId`);
      }
      // transfer goods from one entity to other entity, and receive final goods to be stored in transaction
      // tslint:disable-next-line: max-line-length
      transaction.goods = await processTransferGoodsInput((transaction.input.entity as Participant | Person | Cause), (transaction.output.entity as Participant | Person | Cause), transaction.goodsInput, loggedPerson);
      // save references modified in processGoodsInput
      (transaction.input.entity as Participant | Person | Cause).save();
      (transaction.output.entity as Participant | Person | Cause).save();
    }

    // mode: TransactionType.TransferFunds

    else if (transaction.transactionType === TransactionType.TransferFunds && transaction.resourceType === ResourceType.Funds) {
      // protection for currency when working TransactionType.TransferFunds
      if (!transaction.currency && transaction.currency !== 'EUR') {
        throw new Error(`You must supply a currency of EUR when work with transactionType: ${TransactionType.TransferFunds}`);
      }
      // input debit&balance
      (transaction.input.entity as Participant | Person | Cause).fundsBalance.debit += transaction.quantity;
      (transaction.input.entity as Participant | Person | Cause).fundsBalance.balance -= transaction.quantity;
      // input credit&balance
      (transaction.output.entity as Participant | Person | Cause).fundsBalance.credit += transaction.quantity;
      (transaction.output.entity as Participant | Person | Cause).fundsBalance.balance += transaction.quantity;
      // save models
      // TODO: add event
      await (transaction.input.entity as Participant | Person | Cause).save();
      await (transaction.output.entity as Participant | Person | Cause).save();
    }

    // mode: TransactionType.TransferVolunteeringHours

    else if (transaction.transactionType === TransactionType.TransferVolunteeringHours && transaction.resourceType === ResourceType.VolunteeringHours) {
      // input debit&balance
      (transaction.input.entity as Participant | Person | Cause).volunteeringHoursBalance.debit += transaction.quantity;
      (transaction.input.entity as Participant | Person | Cause).volunteeringHoursBalance.balance -= transaction.quantity;
      // input credit&balance
      (transaction.output.entity as Participant | Person | Cause).volunteeringHoursBalance.credit += transaction.quantity;
      (transaction.output.entity as Participant | Person | Cause).volunteeringHoursBalance.balance += transaction.quantity;
      // save models
      // TODO: add event
      await (transaction.input.entity as Participant | Person | Cause).save();
      await (transaction.output.entity as Participant | Person | Cause).save();
    }

    // mode: Not Detected Transaction Type or Wrong Combination ex TRANSFER_VOLUNTEERING_HOURS with FUNDS

    else {
      throw new Error(`Invalid transaction type combination, you must supply a valid combination ex TransactionType:${TransactionType.TransferFunds} with ResourceType: ${ResourceType.Funds}`);
    }

    // common post transaction for all modes

    // assign createdByPersonId before delete loggedPersonId
    transaction.createdByPersonId = transaction.loggedPersonId;
    // clean non useful props, are required only to know sent entityType in payload, else they are stored in ledger
    delete transaction.input.id;
    delete transaction.output.id;
    delete transaction.input.type;
    delete transaction.output.type;
    delete transaction.loggedPersonId;
    // add date in epoch unix time
    transaction.createdDate = new Date().getTime();

    // save transaction
    await transaction.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.TransactionCreatedEvent, transaction);
  }

  // @Invokable()
  // public async get(
  //   @Param(yup.string())
  //   id: string
  // ) {
  //   const existing = await Transaction.getOne(id);
  //   if (!existing || !existing.id) {
  //     throw new Error(`No transaction exists with that id ${id}`);
  //   }
  //   return existing;
  // }

  @Invokable()
  public async update(
    @Param(Transaction)
    transaction: Transaction,
  ) {
    // Retrieve to see if exists
    let existing = await Transaction.getById(transaction.id);

    if (!existing || !existing.id) {
      throw new Error('No transaction exists with that id');
    }

    // update fields
    existing.metaDataInternal = transaction.metaDataInternal;

    // save transaction
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.TransactionUpdatedEvent, transaction);
  }

  /**
   * get id: custom function to use `type` and `participant` in rich query
   * default convector get don't use of this properties and give problems, 
   * like we use ids of other models and it works 
   */
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string,
  ): Promise<Transaction> {
    // get host participant from fingerprint
    // const participant: Participant = await getParticipantByIdentity(this.sender);
    const existing = await Transaction.query(Transaction, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_TRANSACTION,
        id,
      }
    });
    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No transaction exists with that id ${id}`);
    }
    return existing[0];
  }

  @Invokable()
  public async getAll(): Promise<FlatConvectorModel<Transaction>[]> {
    return (await Transaction.getAll(c.CONVECTOR_MODEL_PATH_TRANSACTION)).map(transaction => transaction.toJSON() as any);
  }

  /**
   * get participants with complex query filter
   */
  @Invokable()
  public async getComplexQuery(
    @Param(yup.object())
    complexQueryInput: any,
  ): Promise<Transaction | Transaction[]> {
    if (!complexQueryInput || !complexQueryInput.filter) {
      throw new Error(c.EXCEPTION_ERROR_NO_COMPLEX_QUERY);
    }
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_TRANSACTION,
        // spread arbitrary query filter
        ...complexQueryInput.filter
      },
      // not useful
      // fields: (complexQueryInput.fields) ? complexQueryInput.fields : undefined,
      sort: (complexQueryInput.sort) ? complexQueryInput.sort : undefined,
    };
    const resultSet: Transaction | Transaction[] = await Transaction.query(Transaction, complexQuery);
    return resultSet;
  }

}