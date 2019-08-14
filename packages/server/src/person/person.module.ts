import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { AppService } from '../app.service';

@Module({
  controllers: [PersonController],
  providers: [PersonService, AppService]
})
export class PersonModule {}
