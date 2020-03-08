import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewCauseInput } from './dto';
import { Cause } from './models';
import { CauseService } from './cause.service';
import { GqlAuthGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';

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
    @Args('newCauseData') newCauseData: NewCauseInput,
  ): Promise<Cause> {
    const cause = await this.causeService.create(newCauseData);
    // fire subscription
    pubSub.publish('causeAdded', { causeAdded: cause });
    return cause;
  }

  @Subscription(returns => Cause)
  causeAdded() {
    return pubSub.asyncIterator('causeAdded');
  }

}
