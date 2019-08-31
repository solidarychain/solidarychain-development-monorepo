import { Injectable } from '@nestjs/common';
import { NewParticipantInput } from './dto/new-participant.input';
import { ParticipantArgs } from './dto/participant.args';
import { Participant } from './models/participant';

@Injectable()
export class ParticipantService {
  async create(data: NewParticipantInput): Promise<Participant> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Participant> {
    return {} as any;
  }

  async findAll(recipesArgs: ParticipantArgs): Promise<Participant[]> {
    return [] as Participant[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
