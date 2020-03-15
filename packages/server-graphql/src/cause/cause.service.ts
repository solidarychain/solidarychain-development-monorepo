import { Injectable, Logger } from '@nestjs/common';
import { Cause as CauseConvectorModel } from '@solidary-network/cause-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { v4 as uuid } from 'uuid';
import { CauseControllerBackEnd } from '../convector';
import { NewCauseInput } from './dto';
import { Cause } from './models';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';

@Injectable()
export class CauseService {
  async create(data: NewCauseInput): Promise<Cause> {
    try {
      // compose ConvectorModel from NewInput
      const causeToCreate: CauseConvectorModel = new CauseConvectorModel({
        ...data,
        // require to inject values
        id: data.id ? data.id : uuid(),
        // convert Date to epoch unix time to be stored in convector cause model
        startDate: ((data.startDate as unknown) as number),
        endDate: ((data.endDate as unknown) as number),
        // TODO: leave it for chaincode
        createdDate: ((new Date().getTime()) as number),
      });

      await CauseControllerBackEnd.create(causeToCreate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Cause[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<CauseConvectorModel[]>> = await CauseControllerBackEnd.getAll();
      // require to map fabric model to graphql Cause[]
      return (paginationArgs)
        ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as Cause[]
        : convectorModel as Cause[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }

  async findOngoing(date: number, causeArgs: PaginationArgs): Promise<Cause | Cause[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<CauseConvectorModel>> = await CauseControllerBackEnd.getOngoing(date) as CauseConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: CauseConvectorModel[] = fabricModel.map((e: CauseConvectorModel) => new CauseConvectorModel(e));
    // call common find method
    const model: Cause[] = await this.findBy(convectorModel, causeArgs) as Cause[];
    // return model
    return model;
  }

  async findComplexQuery(getByComplexQueryInput: GetByComplexQueryInput, causeArgs: PaginationArgs): Promise<Cause | Cause[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<CauseConvectorModel>> = await CauseControllerBackEnd.getComplexQuery(getByComplexQueryInput) as CauseConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: CauseConvectorModel[] = fabricModel.map((e: CauseConvectorModel) => new CauseConvectorModel(e));
    // call common find method
    const model: Cause[] = await this.findBy(convectorModel, causeArgs) as Cause[];
    // return model
    return model;
  }

  async findOneById(id: string): Promise<Cause> {
    // get fabric model with _props
    const fabricModel: CauseConvectorModel = await CauseControllerBackEnd.get(id);
    // convert fabric model to convector model (remove _props)
    const convectorModel: CauseConvectorModel = new CauseConvectorModel(fabricModel);
    // trick: must return convector model as a graphql model, to prevent property conversion problems
    const model: Cause = await this.findBy(convectorModel, null) as Cause;
    return model;
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: CauseConvectorModel | CauseConvectorModel[], causeArgs: PaginationArgs): Promise<Cause | Cause[]> {
    try {
      // working in array mode
      if (Array.isArray(convectorModel)) {
        // require to map fabric model to graphql Cause[]
        return (causeArgs)
          ? convectorModel.splice(causeArgs.skip, causeArgs.take) as unknown as Cause[]
          : convectorModel as unknown as Cause[];
      } else {
        // only convert attributes if have attributes array
        // require to map fabric model to graphql Cause[]
        return convectorModel as unknown as Cause;
      }
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

}
