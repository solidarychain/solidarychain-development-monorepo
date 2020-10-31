import { appConstants as c, checkValidModelIds, removeOwnerFromAmbassadorsArray, ChaincodeEvent } from '@solidary-chain/common-cc';
import { Participant, getParticipantByIdentity } from '@solidary-chain/participant-cc';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { getEntity, checkUniqueField } from './utils';
import { Asset } from './asset.model';

@Controller('asset')
export class AssetController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Asset)
    asset: Asset
  ) {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    // check if all ambassadors are valid persons
    await checkValidModelIds(c.CONVECTOR_MODEL_PATH_PERSON, c.CONVECTOR_MODEL_PATH_PERSON_NAME, asset.ambassadors);

    // get postfix name this way we can have multiple assets with same name
    const postfixCode: string = asset.id.split('-')[0];
    // modify asset.name, used in save to
    asset.name = `${asset.name} [${postfixCode}]`;
    // check unique fields
    await checkUniqueField('_id', asset.id, true);
    await checkUniqueField('name', asset.name, true);

    // add participant
    asset.participant = participant;
    // create a new identity
    asset.identities = [{
      // requesting organization is this.sender
      fingerprint: this.sender,
      status: true
    }];
    // assign input
    asset.owner.entity = await getEntity(asset.owner.type, asset.owner.id);
    // check if is a valid input from entity
    if (!asset.owner.entity) {
      const entityType: string = asset.owner.type.replace(`${c.CONVECTOR_MODEL_PATH_PREFIX}.`, '');
      throw new Error(`There is no entity of type '${entityType}' with Id '${asset.owner.id}'`);
    }
    // assign createdByPersonId before delete loggedPersonId
    asset.createdByPersonId = asset.loggedPersonId;
    // add date in epoch unix time
    asset.createdDate = new Date().getTime();

    // detect if owner is in ambassador array, and remove it
    asset.ambassadors = removeOwnerFromAmbassadorsArray(asset.ambassadors, asset.owner.id);

    // clean non useful props, are required only receive id and entityType
    delete asset.owner.id;
    delete asset.owner.type;
    delete asset.loggedPersonId;

    // save asset
    await asset.save();

    // Emit the Event
    this.tx.stub.generateUUID;
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.AssetCreatedEvent, asset);
  }

  @Invokable()
  public async update(
    @Param(Asset)
    asset: Asset,
  ) {
    // Retrieve to see if exists
    let existing = await Asset.getById(asset.id);

    if (!existing || !existing.id) {
      throw new Error('No asset exists with that ID');
    }

    // update fields
    existing.ambassadors = asset.ambassadors;
    existing.tags = asset.tags;
    existing.metaData = asset.metaData;
    existing.metaDataInternal = asset.metaDataInternal;

    // save asset
    await existing.save();
    // Emit the Event
    await this.tx.stub.setEvent(ChaincodeEvent.AssetUpdatedEvent, asset);
  }

  /**
   * get id: custom function to use `type` and `participant` in rich query
   * default convector get don't use `type` property and give problems, 
   * like we use ids of other models and it works 
   */
  @Invokable()
  public async get(
    @Param(yup.string())
    id: string,
  ): Promise<Asset> {
    // get host participant from fingerprint
    // const participant: Participant = await getParticipantByIdentity(this.sender);
    const existing = await Asset.query(Asset, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_ASSET,
        id,
      }
    });
    // require to check if existing before try to access existing[0].id prop
    if (!existing || !existing[0] || !existing[0].id) {
      throw new Error(`No asset exists with that id ${id}`);
    }
    return existing[0];
  }

  @Invokable()
  public async getAll(): Promise<FlatConvectorModel<Asset>[]> {
    return (await Asset.getAll(c.CONVECTOR_MODEL_PATH_ASSET)).map(asset => asset.toJSON() as any);
  }

  /**
   * get assets with complex query filter
   */
  @Invokable()
  public async getComplexQuery(
    @Param(yup.object())
    complexQueryInput: any,
  ): Promise<Asset | Asset[]> {
    if (!complexQueryInput || !complexQueryInput.filter) {
      throw new Error(c.EXCEPTION_ERROR_NO_COMPLEX_QUERY);
    }
    const complexQuery: any = {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_ASSET,
        // spread arbitrary query filter
        ...complexQueryInput.filter
      },
      // not useful
      // fields: (complexQueryInput.fields) ? complexQueryInput.fields : undefined,
      sort: (complexQueryInput.sort) ? complexQueryInput.sort : undefined,
    };
    const resultSet: Asset | Asset[] = await Asset.query(Asset, complexQuery);
    return resultSet;
  }
}
