import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PersonService } from '../person/person.service';

@Module({
  providers: [UsersService, PersonService],
  exports: [UsersService],
})

export class UsersModule { }
