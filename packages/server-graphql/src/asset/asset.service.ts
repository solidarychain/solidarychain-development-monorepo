import { Injectable, Logger } from '@nestjs/common';
import { Asset as AssetConvectorModel } from '@solidary-chain/asset-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { v4 as uuid } from 'uuid';
import { AssetControllerBackEnd } from '../convector';
import { NewAssetInput, UpdateAssetInput } from './dto';
import { Asset } from './models';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { UserInfo } from '@solidary-chain/common-cc';

@Injectable()
export class AssetService {
  async create(data: NewAssetInput): Promise<Asset> {
    try {
      // require to use or generate new id
      const newId: string = (data.id) ? data.id : uuid();
      // compose ConvectorModel from NewInput
      const assetToCreate: AssetConvectorModel = new AssetConvectorModel({
        ...data,
        // require to inject values
        id: newId,
      });
      await AssetControllerBackEnd.create(assetToCreate);
      return this.findOneById(newId);
    } catch (error) {
      throw error;
    }
  }

  async update(data: UpdateAssetInput): Promise<Asset> {
    try {
      // compose ConvectorModel from UpdateInput
      const assetToUpdate: AssetConvectorModel = new AssetConvectorModel({
        ...data
      });
      await AssetControllerBackEnd.update(assetToUpdate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Asset[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<AssetConvectorModel[]>> = await AssetControllerBackEnd.getAll();
      // require to map fabric model to graphql Asset[]
      return (paginationArgs)
        ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as Asset[]
        : convectorModel as Asset[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }

  async findComplexQuery(getByComplexQueryInput: GetByComplexQueryInput, userInfo: UserInfo, paginationArgs: PaginationArgs): Promise<Asset | Asset[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<AssetConvectorModel>> = await AssetControllerBackEnd.getComplexQuery(getByComplexQueryInput, userInfo) as AssetConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: AssetConvectorModel[] = fabricModel.map((e: AssetConvectorModel) => new AssetConvectorModel(e));
    // call common find method
    const model: Asset[] = await this.findBy(convectorModel, paginationArgs) as Asset[];
    // return model
    return model;
  }

  async findOneById(id: string): Promise<Asset> {
    // get fabric model with _props
    const fabricModel: AssetConvectorModel = await AssetControllerBackEnd.get(id);
    // convert fabric model to convector model (remove _props)
    const convectorModel: AssetConvectorModel = new AssetConvectorModel(fabricModel);
    // trick: must return convector model as a graphql model, to prevent property conversion problems
    const model: Asset = await this.findBy(convectorModel, null) as Asset;
    return model;
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: AssetConvectorModel | AssetConvectorModel[], paginationArgs: PaginationArgs): Promise<Asset | Asset[]> {
    try {
      // working in array mode
      if (Array.isArray(convectorModel)) {
        // require to map fabric model to graphql Asset[]
        return (paginationArgs)
          ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as unknown as Asset[]
          : convectorModel as unknown as Asset[];
      } else {
        // only convert attributes if have attributes array
        // require to map fabric model to graphql Asset[]
        return convectorModel as unknown as Asset;
      }
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

}
