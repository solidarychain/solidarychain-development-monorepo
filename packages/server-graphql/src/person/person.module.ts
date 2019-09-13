import { Module } from '@nestjs/common';
import DateScalar from '../common/scalars/date.scalar';
import PersonResolver from './person.resolver';
import PersonService from './person.service';

@Module({
  providers: [PersonResolver, PersonService, DateScalar],
})

export default class PersonModule { }
