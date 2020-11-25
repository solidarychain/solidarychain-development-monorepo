import { UseGuards } from '@nestjs/common/decorators/core';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../auth/guards';
import { PaginationArgs } from '../common/dto';
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
  ): Promise<GraphData> {
    return this.dashboardService.getReactForceData(paginationArgs);
  }
}
