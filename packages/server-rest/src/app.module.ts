import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParticipantModule } from './participant/participant.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, ParticipantModule, PersonModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
