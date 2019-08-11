import { Module } from '@nestjs/common';
import { ParticipantController } from './participant.controller';

@Module({
  controllers: [ParticipantController],
  providers: [],
})
export class ParticipantModule {}
