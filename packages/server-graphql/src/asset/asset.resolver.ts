import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewAssetInput, UpdateAssetInput } from './dto';
import { Asset } from './models';
import { AssetService } from './asset.service';
import { GqlAuthGuard, GqlRolesGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { CurrentUser, Roles } from '../auth/decorators';
import CurrentUserPayload from '../common/types/current-user-payload';
import { SubscriptionEvent } from '../common/enums';
import { UserRoles, UserInfo } from '@solidary-chain/common-cc';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) { }

  // TODO
  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Asset])
  assets(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Asset[]> {
    return this.assetService.findAll(paginationArgs);
  }

  @Query(returns => [Asset])
  assetComplexQuery(
    @CurrentUser() user: CurrentUserPayload,
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Asset | Asset[]> {
    const userInfo: UserInfo = { personId: user.userId, roles: user.roles };
    return this.assetService.findComplexQuery(getByComplexQueryInput, userInfo, paginationArgs);
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
