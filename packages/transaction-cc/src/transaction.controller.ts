import { Asset, Entity } from '@solidary-network/asset-cc';
import { appConstants as c } from '@solidary-network/common-cc';
import { getParticipantByIdentity, Participant } from '@solidary-network/participant-cc';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { ResourceType, TransactionType } from './enums';
import { Transaction } from './transaction.model';
import { checkUniqueField, getEntity } from './utils';
import { Person } from '@solidary-network/person-cc';

@Controller('transaction')
export class TransactionController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Transaction)
    transaction: Transaction,
  ) {
    // use '' to prevent undefined when empty
    let debugMessage: string = '';

    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    // protect from transfer from same input has output
    if (transaction.input.id === transaction.output.id && transaction.input.type === transaction.output.type) {
      throw new Error('You can\'t transfer from input to same output entity, you must transfer from input to a different output entity!');
    }

    // check unique fields
    await checkUniqueField('_id', transaction.id, true);

    // participant
    transaction.participant = participant;
    // assign input/output
    transaction.input.entity = await getEntity(transaction.input.type, transaction.input.id);
    transaction.output.entity = await getEntity(transaction.output.type, transaction.output.id);

    // detect if is a transfer type, and asset resourceType
    if (transaction.transactionType === TransactionType.Transfer && (
      transaction.resourceType === ResourceType.PhysicalAsset || transaction.resourceType === ResourceType.DigitalAsset
    )) {
      // empty username
      if (!transaction.loggedPersonId) {
        throw new Error(`You must supply owner user loggedPersonId when transfer assets of type '${transaction.resourceType}'`);
      } else if (!transaction.assetId) {
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

        // get loggedPerson from loggedPersonId
        const loggedPerson: Person = await Person.getById(transaction.loggedPersonId);
        // protection check if ownerPerson exists 
        if (!loggedPerson && !loggedPerson.id) {
          throw new Error(`There is no person with Id '${transaction.loggedPersonId}'`);
        }

        // protection check if transaction input owner is the same as asset owner and same type, if one is different throw exception
        if (transaction.input.id != (asset.owner.entity as any).id || transaction.input.type != (asset.owner.entity as any).type) {
          // debugMessage = `transaction.input.id: ${transaction.input.id} != asset.owner.entity: ${(asset.owner.entity as any).id} && transaction.input.type: ${transaction.input.type} != asset.owner.entity: ${(asset.owner.entity as any).type}`;
          throw new Error(`Transaction input owner is not the owner of the asset${debugMessage}`);
        }

        // protection check if loggedPerson is the owner or if loggedPerson in in authorized ambassador's
        if (transaction.input.id != loggedPerson.id && !asset.ambassadors.includes(loggedPerson.id)) {
          // debugMessage = `:debugMessage:transaction.input.id: ${transaction.input.id} != loggedPerson.id: ${loggedPerson.id} (${transaction.input.id != loggedPerson.id}}) - ${JSON.stringify(asset.ambassadors)}:${asset.ambassadors.includes(loggedPerson.id)}:(${!asset.ambassadors.includes(loggedPerson.id)})`;
          throw new Error(`logged person is not the owner of the asset, or is not an authorized asset ambassador${debugMessage}`);
        }

        // assign new owner id and type
        asset.owner.entity = transaction.output.entity;
        // assign which asset was transferred to transaction
        transaction.assetId = asset.id;
        // save asset
        await asset.save();
      }
    }

    // assign createdByPersonId before delete loggedPersonId
    transaction.createdByPersonId = transaction.loggedPersonId;

    // clean non useful props, are required only to know sent entityType in payload, else they are stored in ledger
    delete transaction.input.id;
    delete transaction.output.id;
    delete transaction.input.type;
    delete transaction.output.type;
    delete transaction.loggedPersonId;
    // must act has a db transaction, only get here if asset.save pass
    // add date in epoch unix time
    transaction.createdDate = new Date().getTime();
    // save transaction
    await transaction.save();
  }

  // @Invokable()
  // public async get(
  //   @Param(yup.string())
  //   id: string
  // ) {
  //   const existing = await Transaction.getOne(id);
  //   if (!existing || !existing.id) {
  //     throw new Error(`No transaction exists with that ID ${id}`);
  //   }
  //   return existing;
  // }

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