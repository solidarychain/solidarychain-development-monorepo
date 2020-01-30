import { Module } from '@nestjs/common';
import DateScalar from '../common/scalars/date.scalar';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
// import { ParticipantModule } from '../participant/participant.module';
// import { PersonModule } from '../person/person.module';

@Module({
  // import ParticipantModule, PersonModule to have access to Participant and Person Module
  // imports: [ParticipantModule, PersonModule],
  providers: [
    TransactionResolver,
    TransactionService,
    DateScalar,
  ],
  exports: [TransactionService],
})

export class TransactionModule { }
