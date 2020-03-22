import { Asset, AssetType } from '@solidary-network/asset-cc';
import { appConstants as c } from '@solidary-network/common-cc';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { ResourceType, TransactionType } from './enums';
import { Transaction } from './transaction.model';
import { getEntity, checkUniqueField } from './utils';
import { getParticipantByIdentity, Participant } from '@solidary-network/participant-cc';
import { Person } from '@solidary-network/person-cc';

@Controller('transaction')
export class TransactionController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Transaction)
    transaction: Transaction,
  ) {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    // check unique fields
    await checkUniqueField('_id', transaction.id);

    // participant
    transaction.participant = participant;
    // assign input/output
    transaction.input.entity = await getEntity(transaction.input.type, transaction.input.id);
    transaction.output.entity = await getEntity(transaction.output.type, transaction.output.id);
    // clean non useful props, are required only top know sent entityType
    delete transaction.input.id;
    delete transaction.output.id;
    delete transaction.input.type;
    delete transaction.output.type;
    // add date in epoch unix time
    transaction.createdDate = new Date().getTime();

    // TODO: cant transfer asset from same user to same user

    // RECEIVE fingerprint from graphql

    // detect if is a transfer type, and asset resourceType
    if (transaction.transactionType === TransactionType.Transfer && (
      transaction.resourceType === ResourceType.PhysicalAsset || transaction.resourceType === ResourceType.DigitalAsset
    )) {
      // TODO: improve protection REPLACE WITH identities.fingerprint
      if (!transaction.ownerUsername) {
        throw new Error(`You must supply owner username when transfer assets of type ${transaction.resourceType}`);
      } else if (!transaction.assetId) {
        throw new Error(`You must supply a assetId when transfer assets of type ${transaction.resourceType}`);
      } else {
        // get asset
        const asset: Asset = await Asset.getOne(transaction.assetId);
        if (!!asset && !asset.id) {
          throw new Error(`There is no asset with Id (${transaction.assetId})`);
        }
        // get person
        const person: Person | Person[] = await Person.query(Person, {
          selector: {
            type: c.CONVECTOR_MODEL_PATH_PERSON,
            username: transaction.ownerUsername,
            // participant: { id: participant.id }
          }
        });
        // if ((person as Person[]).length > 0) {
if (!person && !person[0].id) {  
          throw new Error(`There is no person with owner username (${transaction.ownerUsername})`);
        }

        // check if asset resourceType is equal to payload.resourceType
        if (transaction.resourceType !== (asset.assetType as unknown as ResourceType)) {
          throw new Error(`Transaction resourceType (${transaction.resourceType}) is different from asset resourceType (${asset.assetType}), you can't change resourceType in transfers`);
        }
        // TODO CHANGE fingerprint of the asset (OWNER)
        // change asset properties
// asset.name = `${asset.name}-owner:${transaction.ownerUsername}`;
// change asset identity ownership
// TODO: BUG must be the OUTPUT Entity and not the INPUT
// TODO: PUT TO WORK with all Entities and not only Persons
asset.identities = person[0].identities;
        // assign which asset was transferred to transaction
        transaction.assetId = asset.id;
        await asset.save();
      }
    }
    // must act has a db transaction, only get here if 
    // save asset
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
        // participant: { id: participant.id }
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