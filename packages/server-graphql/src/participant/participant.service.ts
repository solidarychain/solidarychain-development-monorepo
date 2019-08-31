import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { NewParticipantInput } from './dto/new-participant.input';
import { ParticipantArgs } from './dto/participant.args';
import { Participant } from './models/participant';
import { ParticipantControllerBackEnd } from '../convector';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { Participant as ParticipantConvectorModel } from '@convector-sample/participant-cc';

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
      const participant: Participant = await ParticipantControllerBackEnd.get(id);
      // convert fabric model to convector module _props
      const participantModel = new ParticipantConvectorModel(participant).toJSON();
      // trick: must return convector model as a graphql model, to prevent property conversion problems
      return (participantModel as Participant);
    } catch (error) {
      throw error;
    }
  }

  async findAll(participantArgs: ParticipantArgs): Promise<Participant[]> {
    try {
      const fabricModel: Array<FlatConvectorModel<Participant>> = await ParticipantControllerBackEnd.getAll();
      // require to map fabric model to graphql Participant[]
      return (participantArgs)
        ? fabricModel.splice(participantArgs.skip, participantArgs.take) as Participant[]
        : fabricModel as Participant[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }

  // async remove(id: string): Promise<boolean> {
  //   return true;
  // }
}
