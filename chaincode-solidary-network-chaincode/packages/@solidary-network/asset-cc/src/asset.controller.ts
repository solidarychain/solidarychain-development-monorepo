import { appConstants as c } from '@solidary-network/common-cc';
import { Participant } from '@solidary-network/participant-cc';
import { getParticipantByIdentity } from '@solidary-network/person-cc';
import { Controller, ConvectorController, FlatConvectorModel, Invokable, Param } from '@worldsibu/convector-core';
import { ChaincodeTx } from '@worldsibu/convector-platform-fabric';
import * as yup from 'yup';
import { getEntity } from '.';
import { Asset } from './asset.model';

// TODO: transfer asset to Entity

@Controller('asset')
export class AssetController extends ConvectorController<ChaincodeTx> {
  @Invokable()
  public async create(
    @Param(Asset)
    asset: Asset
  ) {
    // get host participant from fingerprint
    // TODO: move to common-cc in all uses
    const participant: Participant = await getParticipantByIdentity(this.sender);
    if (!!participant && !participant.id) {
      throw new Error('There is no participant with that identity');
    }

    // TODO: get owner from id

    // check duplicated id
    const exists = await Asset.getOne(asset.id);
    if (!!exists && exists.id) {
      throw new Error(`There is a asset with that Id already (${asset.id})`);
    }

    // check duplicated name
    const existsName = await Asset.query(Asset, {
      selector: {
        type: c.CONVECTOR_MODEL_PATH_ASSET,
        name: asset.name,
        participant: {
          id: participant.id
        }
      }
    });
    if ((existsName as Asset[]).length > 0) {
      throw new Error(`There is a asset registered with that name already (${asset.name})`);
    }

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
    // clean non useful props, are required only receive id and entityType
    delete asset.owner.id;
    delete asset.owner.type;

    // add date in epoch unix time
    asset.createdDate = new Date().getTime();

    await asset.save();
  }

  @Invokable()
  public async get(
    @Param(yup.string())
    id: string
  ) {
    const existing = await Asset.getOne(id);
    if (!existing || !existing.id) {
      throw new Error(`No asset exists with that ID ${id}`);
    }
    return existing;
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
