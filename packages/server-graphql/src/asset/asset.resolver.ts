import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewAssetInput, UpdateAssetInput } from './dto';
import { Asset } from './models';
import { AssetService } from './asset.service';
import { GqlAuthGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { CurrentUser } from '../common/decorators';
import CurrentUserPayload from '../common/types/current-user-payload';
import { SubscriptionEvent } from '../common/types';

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
    @CurrentUser() user: CurrentUserPayload,
    @Args('newAssetData') newAssetData: NewAssetInput,
  ): Promise<Asset> {
    // inject username into newAssetData
    newAssetData.loggedPersonId = user.userId;
    const asset = await this.assetService.create(newAssetData);
    pubSub.publish(SubscriptionEvent.assetAdded, { [SubscriptionEvent.assetAdded]: asset });
    return asset;
  }

  @Mutation(returns => Asset)
  async assetUpdate(
    @Args('updateAssetData') updateAssetData: UpdateAssetInput,
  ): Promise<Asset> {
    const asset = await this.assetService.update(updateAssetData);
    pubSub.publish(SubscriptionEvent.assetUpdated, { [SubscriptionEvent.assetUpdated]: asset });
    return asset;
  }

  @Subscription(returns => Asset)
  assetAdded() {
    return pubSub.asyncIterator(SubscriptionEvent.assetAdded);
  }

  @Subscription(returns => Asset)
  assetUpdated() {
    return pubSub.asyncIterator(SubscriptionEvent.assetUpdated);
  }
}
