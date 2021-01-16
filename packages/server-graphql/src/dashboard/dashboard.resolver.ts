import { UseGuards } from '@nestjs/common/decorators/core';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CurrentUser } from '../auth/decorators';
import { GqlAuthGuard } from '../auth/guards';
import { PaginationArgs } from '../common/dto';
import CurrentUserPayload from '../common/types/current-user-payload';
import { Person } from '../person/models';
import { DashboardService } from './dashboard.service';
import { GraphData } from './models';

const pubSub = new PubSub();

@Resolver(of => Person)
export class DashboardResolver {
  constructor(
    private readonly dashboardService: DashboardService,
  ) { }

  @UseGuards(GqlAuthGuard)
  @Query(returns => GraphData)
  async reactForceData(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<GraphData> {
    return this.dashboardService.getReactForceData(paginationArgs, user);
  }
}
