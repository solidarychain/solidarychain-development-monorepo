import { Module } from '@nestjs/common';
import DateScalar from '../common/scalars/date.scalar';
import { CauseResolver } from './cause.resolver';
import { CauseService } from './cause.service';

@Module({
  providers: [
    CauseResolver,
    CauseService,
    DateScalar,
  ],
  exports: [CauseService],
})

export class CauseModule { }
