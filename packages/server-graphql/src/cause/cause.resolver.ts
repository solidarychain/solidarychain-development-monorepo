import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard, GqlRolesGuard } from '../auth/guards';
import { CurrentUser, Roles } from '../auth/decorators';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import CurrentUserPayload from '../common/types/current-user-payload';
import { CauseService } from './cause.service';
import { NewCauseInput, UpdateCauseInput } from './dto';
import { Cause } from './models';
import { SubscriptionEvent } from '../common/enums';
import { GraphData } from '../dashboard/models';
import { RelationType } from '../dashboard/enums';
import { appConstants as c } from '../dashboard/constants';
import { appConstants as cc, UserRoles } from '@solidary-chain/common-cc';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Cause)
export class CauseResolver {
  constructor(private readonly causeService: CauseService) { }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Cause])
  causes(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Cause | Cause[]> {
    return this.causeService.findAll(paginationArgs, user);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Cause])
  causeComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Cause | Cause[]> {
    return this.causeService.findComplexQuery(getByComplexQueryInput, paginationArgs, user);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Cause])
  causeOngoing(
    @Args('date') date: number,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Cause | Cause[]> {
    return this.causeService.findOngoing(date, paginationArgs, user);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => Cause)
  async causeById(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Cause> {
    const cause = await this.causeService.findOneById(id, user);
    if (!cause.id) {
      throw new NotFoundException(id);
    }
    return cause;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Cause)
  async causeNew(
    @Args('newCauseData') newCauseData: NewCauseInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Cause> {
    const cause = await this.causeService.create(newCauseData, user);
    pubSub.publish(SubscriptionEvent.causeAdded, { [SubscriptionEvent.causeAdded]: cause });
    // TODO leave it maybe be useful in future
    // pubSub.publish(SubscriptionEvent.reactForceData, { [SubscriptionEvent.reactForceData]: {
    //   // nodes: [{ id: 1 }]
    //     nodes: [{ id: cause.id, label: `${cc.CONVECTOR_MODEL_PATH_PERSON_NAME}:${cause.name}`, ...c.PERSON_NODE_PROPS }],
    //     links: [{ source: cause.id, target: c.GENESIS_NODE_ID, label: RelationType.HAS_BORN, ...c.LINK_COMMON_PROPS }],
    // }});
    return cause;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Cause)
  async causeUpdate(
    @Args('updateCauseData') updateCauseData: UpdateCauseInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Cause> {
    const cause = await this.causeService.update(updateCauseData, user);
    pubSub.publish(SubscriptionEvent.causeUpdated, { [SubscriptionEvent.causeUpdated]: cause });
    return cause;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Cause)
  causeAdded(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.causeAdded);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Cause)
  causeUpdated(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.causeUpdated);
  }

  // work but seems that we must create on subscription for each entity model, this way is better to listen to main create event and map data in frontend
  // @Subscription(returns => GraphData)
  // reactForceData(
  //   @CurrentUser() user: CurrentUserPayload,
  // ) {
  //   return pubSub.asyncIterator(SubscriptionEvent.reactForceData);
  // }
}
