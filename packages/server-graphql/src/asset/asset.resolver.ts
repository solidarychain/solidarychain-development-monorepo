import { Logger, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { hasRole, UserRoles } from '@solidary-chain/common-cc';
import { PubSub } from 'apollo-server-express';
import { CurrentUser, Roles } from '../auth/decorators';
import { GqlAuthGuard, GqlRolesGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { SubscriptionEvent } from '../common/enums';
import CurrentUserPayload from '../common/types/current-user-payload';
import { AssetService } from './asset.service';
import { NewAssetInput, UpdateAssetInput } from './dto';
import { Asset } from './models';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Asset)
export class AssetResolver {
  constructor(private readonly assetService: AssetService) { }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Asset])
  assets(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Asset | Asset[]> {
    return this.assetService.findAll(paginationArgs, user);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Asset])
  assetComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Asset | Asset[]> {
    return this.assetService.findComplexQuery(getByComplexQueryInput, paginationArgs, user);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => Asset)
  async assetById(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Asset> {
    const asset = await this.assetService.findOneById(id, user);
    if (!asset.id) {
      throw new NotFoundException(id);
    }
    return asset;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Asset)
  async assetNew(
    @Args('newAssetData') newAssetData: NewAssetInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Asset> {
    const asset = await this.assetService.create(newAssetData, user);
    pubSub.publish(SubscriptionEvent.assetAdded, { [SubscriptionEvent.assetAdded]: asset });
    return asset;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Asset)
  async assetUpdate(
    @Args('updateAssetData') updateAssetData: UpdateAssetInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Asset> {
    const asset = await this.assetService.update(updateAssetData, user);
    pubSub.publish(SubscriptionEvent.assetUpdated, { [SubscriptionEvent.assetUpdated]: asset });
    return asset;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Asset, {
    filter: (payload, variables: any, ctx: any) => {
      // Logger.log(`payload: [${JSON.stringify(payload[SubscriptionEvent.assetAdded], undefined, 2)}]`);
      // Logger.log(`${payload[SubscriptionEvent.assetAdded].owner.entity.id} === ${ctx.connection.context.user.userId}`);
      // Logger.log(`payload[SubscriptionEvent.assetAdded].ambassadors: [${JSON.stringify(payload[SubscriptionEvent.assetAdded].ambassadors, undefined, 2)}]`);
      // Logger.log(`ctx.connection.context.user.userId: [${ctx.connection.context.user.userId}]`);
      // Logger.log(`${ctx.connection.context.user.userId} includes ${payload[SubscriptionEvent.assetAdded].ambassadors.includes(ctx.connection.context.user.userId)}\n`);
      // user must be creator, owner, ambassador or have adminRole
      return payload[SubscriptionEvent.assetAdded].createdByPersonId === ctx.connection.context.user.userId
        || payload[SubscriptionEvent.assetAdded].owner.entity.id === ctx.connection.context.user.userId
        || payload[SubscriptionEvent.assetAdded].ambassadors.includes(ctx.connection.context.user.userId)
        || hasRole(ctx.connection.context.user.roles, UserRoles.ROLE_ADMIN)
        ;
    }
  })
  assetAdded(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.assetAdded);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Asset)
  assetUpdated(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.assetUpdated);
  }
}
