import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../auth/guards';
import { CurrentUser } from '../common/decorators';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import CurrentUserPayload from '../common/types/current-user-payload';
import { CauseService } from './cause.service';
import { NewCauseInput, UpdateCauseInput } from './dto';
import { Cause } from './models';
import { SubscriptionEvent } from '../common/types';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Cause)
export class CauseResolver {
  constructor(private readonly causeService: CauseService) { }

  @Query(returns => [Cause])
  causes(
    @Args() causesArgs: PaginationArgs,
  ): Promise<Cause[]> {
    return this.causeService.findAll(causesArgs);
  }

  @Query(returns => [Cause])
  causeOngoing(
    @Args('date') date: number,
    @Args() causesArgs: PaginationArgs,
  ): Promise<Cause | Cause[]> {
    return this.causeService.findOngoing(date, causesArgs);
  }

  @Query(returns => [Cause])
  causeComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() causesArgs: PaginationArgs,
  ): Promise<Cause | Cause[]> {
    return this.causeService.findComplexQuery(getByComplexQueryInput, causesArgs);
  }

  @Query(returns => Cause)
  async causeById(
    @Args('id') id: string,
  ): Promise<Cause> {
    const cause = await this.causeService.findOneById(id);
    if (!cause) {
      throw new NotFoundException(id);
    }
    return cause;
  }

  @Mutation(returns => Cause)
  async causeNew(
    @CurrentUser() user: CurrentUserPayload,
    @Args('newCauseData') newCauseData: NewCauseInput,
  ): Promise<Cause> {
    // inject username into newCauseData
    newCauseData.loggedPersonId = user.userId;
    const cause = await this.causeService.create(newCauseData);
    pubSub.publish(SubscriptionEvent.causeAdded, { [SubscriptionEvent.causeAdded]: cause });
    return cause;
  }

  @Mutation(returns => Cause)
  async causeUpdate(
    @Args('updateCauseData') updateCauseData: UpdateCauseInput,
  ): Promise<Cause> {
    const cause = await this.causeService.update(updateCauseData);
    pubSub.publish(SubscriptionEvent.causeUpdated, { [SubscriptionEvent.causeUpdated]: cause });
    return cause;
  }

  @Subscription(returns => Cause)
  causeAdded() {
    return pubSub.asyncIterator(SubscriptionEvent.causeAdded);
  }

  @Subscription(returns => Cause)
  causeUpdated() {
    return pubSub.asyncIterator(SubscriptionEvent.causeUpdated);
  }
}
