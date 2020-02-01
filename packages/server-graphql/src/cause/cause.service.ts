import { Injectable, Logger } from '@nestjs/common';
import { Cause as CauseConvectorModel } from '@solidary-network/cause-cc';
import { PaginationArgs } from '@solidary-network/common';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { v4 as uuid } from 'uuid';
import { CauseControllerBackEnd } from '../convector';
import NewCauseInput from './dto/new-cause.input';
import Cause from './models/cause.model';

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
        created: ((new Date().getTime()) as number),
      });

      await CauseControllerBackEnd.create(causeToCreate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Cause> {
    try {
      // get fabric model with _props
      const fabricModel: CauseConvectorModel = await CauseControllerBackEnd.get(id) as CauseConvectorModel;
      // convert fabric model to convector model (remove _props)
      const convectorModel = new CauseConvectorModel(fabricModel).toJSON();
      // trick: must return convector model as a graphql model, to prevent property conversion problems
      return (convectorModel as Cause);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Cause[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<CauseConvectorModel>> = await CauseControllerBackEnd.getAll();
      // require to map fabric model to graphql Cause[]
      return (paginationArgs)
        ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as Cause[]
        : convectorModel as Cause[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }

}
