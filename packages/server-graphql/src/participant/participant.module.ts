import { Module } from '@nestjs/common';
import DateScalar from '../common/scalars/date.scalar';
import { ParticipantResolver } from './participant.resolver';
import { ParticipantService } from './participant.service';

@Module({
  providers: [
    ParticipantResolver,
    ParticipantService,
    DateScalar,
  ],
  exports: [ParticipantService],
})

export class ParticipantModule { }
