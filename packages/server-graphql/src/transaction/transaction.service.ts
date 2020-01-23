import { Participant as ParticipantConvectorModel } from '@solidary-network/participant-cc';
import { Injectable, Logger } from '@nestjs/common';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { ParticipantControllerBackEnd } from '../convector';
import NewParticipantInput from './dto/new-transaction.input';
import ParticipantArgs from './dto/transaction.args';
import Participant from './models/transaction.model';

@Injectable()
export class TransactionService {
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
      const fabricModel: Participant = await ParticipantControllerBackEnd.get(id);
      // convert fabric model to convector model (remove _props)
      const convectorModel = new ParticipantConvectorModel(fabricModel).toJSON();
      // trick: must return convector model as a graphql model, to prevent property conversion problems
      return (convectorModel as Participant);
    } catch (error) {
      throw error;
    }
  }

  async findAll(participantArgs: ParticipantArgs): Promise<Participant[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<Participant>> = await ParticipantControllerBackEnd.getAll();
      // require to map fabric model to graphql Participant[]
      return (participantArgs)
        ? convectorModel.splice(participantArgs.skip, participantArgs.take) as Participant[]
        : convectorModel as Participant[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }
}
