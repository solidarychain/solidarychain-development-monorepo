import { Module } from '@nestjs/common';
import DateScalar from '../common/scalars/date.scalar';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
  providers: [
    TransactionResolver,
    TransactionService,
    DateScalar,
  ],
  exports: [TransactionService],
})

export class TransactionModule { }
