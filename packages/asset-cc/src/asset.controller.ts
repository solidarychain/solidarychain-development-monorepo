import { appConstants as c, ChaincodeEvent, checkValidModelIds, randomString, removeOwnerFromAmbassadorsArray, CurrentUser } from '@solidary-chain/common-cc';
import { getParticipantByIdentity, Participant } from '@solidary-chain/participant-cc';
import { Controller, ConvectorController, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { Asset } from './asset.model';
import { checkUniqueField, getEntity } from './utils';

@Controller('asset')
export class AssetController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Asset)
    asset: Asset,
    @Param(yup.object())
    user: CurrentUser
  ) {
    // get host participant from fingerprint
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    // check if all ambassadors are valid persons, and update model.ambassadors with uuid's
    // optional: assets don't required ambassadors, check if first item in array is not ''
    if (asset.ambassadors && asset.ambassadors[0] !== '') {
      asset.ambassadors = await checkValidModelIds(c.CONVECTOR_MODEL_PATH_PERSON, c.CONVECTOR_MODEL_PATH_PERSON_NAME, asset.ambassadors, user);
    }

    // get postfix name this way we can have multiple assets with same name
    const postfixCode: string = randomString(10);
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
    // assign input: require to use admin to have access to all entities, this way we can get owner
    asset.owner.entity = await getEntity(asset.owner.type, asset.owner.id, c.CURRENT_USER_ADMIN_ROLE);
    // check if is a valid input from entity
    if (!asset.owner.entity) {
      const entityType: string = asset.owner.type.replace(`${c.CONVECTOR_MODEL_PATH_PREFIX}.`, '');
      throw new Error(`There is no entity of type '${entityType}' with Id '${asset.owner.id}'`);
    }
    // assign createdByPersonId
    asset.createdByPersonId = user.userId;
    // add date in epoch unix time
    asset.createdDate = new Date().getTime();

    // detect if owner is in ambassador array, and remove it
    asset.ambassadors = removeOwnerFromAmbassadorsArray(asset.ambassadors, asset.owner.id);

    // clean non useful props, are required only receive id and entityType
    delete asset.owner.id;
    delete asset.owner.type;

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
    @Param(yup.object())
    user: CurrentUser
  ) {
    // Retrieve to see if exists
    let existing = await Asset.getById(asset.id, user);

    if (!existing || !existing.id) {
      throw new Error('No asset exists with that id');
    }

    // check if all ambassadors are valid persons, and update model.ambassadors with uuid's
    asset.ambassadors = await checkValidModelIds(c.CONVECTOR_MODEL_PATH_PERSON, c.CONVECTOR_MODEL_PATH_PERSON_NAME, asset.ambassadors, user);

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
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Asset> {
    return await Asset.getById(id, user);
  }

  @Invokable()
  public async getAll(
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Asset | Asset[]> {
    return await Asset.getByFilter({}, user);
  }

  /**
   * get model with complex query filter
   */
  @Invokable()
  public async getComplexQuery(
    @Param(yup.object())
    queryParams: any,
    @Param(yup.object())
    user: CurrentUser
  ): Promise<Asset | Asset[]> {
    return await Asset.getByFilter(queryParams, user);
  }
}
