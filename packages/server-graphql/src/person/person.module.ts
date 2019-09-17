import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import DateScalar from '../common/scalars/date.scalar';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service';

@Module({
  // import AuthModule to has access to Auth Guards
  imports: [AuthModule],
  providers: [PersonResolver, PersonService, DateScalar],
  exports: [PersonService],
})

export class PersonModule { }
