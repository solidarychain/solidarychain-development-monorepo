import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import NewCauseInput from './dto/new-cause.input';
import Cause from './models/cause.model';
import { CauseService } from './cause.service';
import { GqlAuthGuard } from '../auth/guards';
import { PaginationArgs } from '@solidary-network/common';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Cause)
export class CauseResolver {
  constructor(private readonly causeService: CauseService) { }

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

  @Query(returns => [Cause])
  causes(
    @Args() causesArgs: PaginationArgs,
  ): Promise<Cause[]> {
    return this.causeService.findAll(causesArgs);
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