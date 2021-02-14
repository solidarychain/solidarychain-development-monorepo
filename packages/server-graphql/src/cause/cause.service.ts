import { Injectable, Logger } from '@nestjs/common';
import { Cause as CauseConvectorModel } from '@solidary-chain/cause-cc';
import { appConstants as cc } from '@solidary-chain/common-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { v4 as uuid } from 'uuid';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import CurrentUserPayload from '../common/types/current-user-payload';
import { CauseControllerBackEnd } from '../convector';
import { NewCauseInput, UpdateCauseInput } from './dto';
import { Cause } from './models';

@Injectable()
export class CauseService {
  async create(data: NewCauseInput, user: CurrentUserPayload): Promise<Cause> {
    try {
      // require to use or generate new id
      const newId: string = (data.id) ? data.id : uuid();
      // compose ConvectorModel from NewInput
      const causeToCreate: CauseConvectorModel = new CauseConvectorModel({
        ...data,
        // require to inject values
        id: newId,
        // convert Date to epoch unix time to be stored in convector cause model
        startDate: ((data.startDate as unknown) as number),
        endDate: ((data.endDate as unknown) as number),
      });
      await CauseControllerBackEnd.create(causeToCreate, user);
      // require to use admin, because we can create a cause for other person, and this prevent we get error `No cause exists with that id ..`
      return this.findOneById(newId, cc.CURRENT_USER_ADMIN_ROLE);
    } catch (error) {
      throw error;
    }
  }

  async update(data: UpdateCauseInput, user: CurrentUserPayload): Promise<Cause> {
    try {
      // compose ConvectorModel from UpdateInput
      const causeToUpdate: CauseConvectorModel = new CauseConvectorModel({
        ...data
      });
      await CauseControllerBackEnd.update(causeToUpdate, user);
      return this.findOneById(data.id, user);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Cause | Cause[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<CauseConvectorModel>> = await CauseControllerBackEnd.getAll(user) as CauseConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: CauseConvectorModel[] = fabricModel.map((e: CauseConvectorModel) => new CauseConvectorModel(e));
    // call common find method
    const model: Cause[] = await this.findBy(convectorModel, paginationArgs) as Cause[];
    // return model
    return model;
  }

  async findComplexQuery(getByComplexQueryInput: GetByComplexQueryInput, paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Cause | Cause[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<CauseConvectorModel>> = await CauseControllerBackEnd.getComplexQuery(getByComplexQueryInput, user) as CauseConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: CauseConvectorModel[] = fabricModel.map((e: CauseConvectorModel) => new CauseConvectorModel(e));
    // call common find method
    const model: Cause[] = await this.findBy(convectorModel, paginationArgs) as Cause[];
    // return model
    return model;
  }

  async findOngoing(date: number, paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Cause | Cause[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<CauseConvectorModel>> = await CauseControllerBackEnd.getOngoing(date, user) as CauseConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: CauseConvectorModel[] = fabricModel.map((e: CauseConvectorModel) => new CauseConvectorModel(e));
    // call common find method
    const model: Cause[] = await this.findBy(convectorModel, paginationArgs) as Cause[];
    // return model
    return model;
  }

  async findOneById(id: string, user: CurrentUserPayload): Promise<Cause> {
    // get fabric model with _props
    const fabricModel: CauseConvectorModel = await CauseControllerBackEnd.get(id, user);
    // convert fabric model to convector model (remove _props)
    const convectorModel: CauseConvectorModel = new CauseConvectorModel(fabricModel);
    // trick: must return convector model as a graphql model, to prevent property conversion problems
    const model: Cause = await this.findBy(convectorModel, null) as Cause;
    return model;
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: CauseConvectorModel | CauseConvectorModel[], paginationArgs: PaginationArgs): Promise<Cause | Cause[]> {
    try {
      // working in array mode
      if (Array.isArray(convectorModel)) {
        // require to map fabric model to graphql Cause[]
        return (paginationArgs)
          ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as unknown as Cause[]
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
