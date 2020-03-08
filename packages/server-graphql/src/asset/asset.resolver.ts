import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewAssetInput } from './dto';
import { Asset } from './models';
import { AssetService } from './asset.service';
import { GqlAuthGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) { }

  @Query(returns => [Asset])
  assets(
    @Args() assetsArgs: PaginationArgs,
  ): Promise<Asset[]> {
    return this.assetService.findAll(assetsArgs);
  }

  @Query(returns => [Asset])
  assetComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() assetsArgs: PaginationArgs,
  ): Promise<Asset | Asset[]> {
    return this.assetService.findComplexQuery(getByComplexQueryInput, assetsArgs);
  }

  @Query(returns => Asset)
  async assetById(
    @Args('id') id: string,
  ): Promise<Asset> {
    const asset = await this.assetService.findOneById(id);
    if (!asset) {
      throw new NotFoundException(id);
    }
    return asset;
  }

  @Mutation(returns => Asset)
  async assetNew(
    @Args('newAssetData') newAssetData: NewAssetInput,
  ): Promise<Asset> {
    const asset = await this.assetService.create(newAssetData);
    // fire subscription
    pubSub.publish('assetAdded', { assetAdded: asset });
    return asset;
  }

  @Subscription(returns => Asset)
  assetAdded() {
    return pubSub.asyncIterator('assetAdded');
  }

}
