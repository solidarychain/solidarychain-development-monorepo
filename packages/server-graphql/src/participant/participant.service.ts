import { Participant as ParticipantConvectorModel } from '@solidary-network/participant-cc';
import { Injectable, Logger } from '@nestjs/common';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { ParticipantControllerBackEnd } from '../convector';
import NewParticipantInput from './dto/new-participant.input';
import { PaginationArgs } from '@solidary-network/common';
import Participant from './models/participant.model';

@Injectable()
export class ParticipantService {
  async create(data: NewParticipantInput): Promise<Participant> {
    try {
      await ParticipantControllerBackEnd.register(data.id, data.name);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Participant> {
    try {
      // get fabric model with _props
      const fabricModel: ParticipantConvectorModel = await ParticipantControllerBackEnd.get(id) as ParticipantConvectorModel;
      // convert fabric model to convector model (remove _props)
      const convectorModel = new ParticipantConvectorModel(fabricModel).toJSON();
      // trick: must return convector model as a graphql model, to prevent property conversion problems
      return (convectorModel as Participant);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Participant[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<ParticipantConvectorModel>> = await ParticipantControllerBackEnd.getAll();
      // require to map fabric model to graphql Participant[]
      return (paginationArgs)
        ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as Participant[]
        : convectorModel as Participant[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }
}
