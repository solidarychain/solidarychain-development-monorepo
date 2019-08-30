import { Module } from '@nestjs/common';
import { ParticipantController } from './participant.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [ParticipantController],
  providers: [],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})

export class ParticipantModule {}
