import { Module } from '@nestjs/common';
import DateScalar from '../common/scalars/date.scalar';
import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';

@Module({
  providers: [
    AssetResolver,
    AssetService,
    DateScalar,
  ],
  exports: [AssetService],
})

export class AssetModule { }
