import { Module } from '@nestjs/common';
import { PersonModule } from '../person/person.module';
import DateScalar from '../common/scalars/date.scalar';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';
import { ParticipantModule } from '../participant/participant.module';
import { CauseModule } from '../cause/cause.module';
import { TransactionModule } from '../transaction/transaction.module';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [ParticipantModule, PersonModule, CauseModule, TransactionModule, AssetModule],
  providers: [DashboardResolver, DashboardService, DateScalar],
  exports: [DashboardService],
})

export class DashboardModule { }
