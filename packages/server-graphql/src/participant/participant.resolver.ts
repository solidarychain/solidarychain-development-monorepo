import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CurrentUser, Roles } from '../auth/decorators';
import { UserRoles } from '../auth/enums';
import { GqlAuthGuard, GqlRolesGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { SubscriptionEvent } from '../common/enums';
import { UserInfo } from '../common/types';
import CurrentUserPayload from '../common/types/current-user-payload';
import { ChangeParticipantIdentityData as ChangeParticipantIdentityInput, NewParticipantInput, UpdateParticipantInput } from './dto';
import { Participant } from './models';
import { ParticipantService } from './participant.service';

const pubSub = new PubSub();
@UseGuards(GqlAuthGuard)
@Resolver(of => Participant)
export class ParticipantResolver {
  constructor(private readonly participantService: ParticipantService) { }

  // TODO
  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Participant])
  participants(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Participant[]> {
    return this.participantService.findAll(paginationArgs);
  }

  // TODO
  @Query(returns => [Participant])
  participantComplexQuery(
    @CurrentUser() user: CurrentUserPayload,
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Participant | Participant[]> {
    const userInfo: UserInfo = { personId: user.userId, roles: user.roles };
    return this.participantService.findComplexQuery(getByComplexQueryInput, userInfo, paginationArgs);
  }

  @Query(returns => Participant)
  async participantById(
    @Args('id') id: string,
  ): Promise<Participant> {
    const participant = await this.participantService.findOneById(id);
    if (!participant) {
      throw new NotFoundException(id);
    }
    return participant;
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Participant)
  async participantByCode(
    @Args('code') code: string,
  ): Promise<Participant> {
    const participant = await this.participantService.findOneByCode(code);
    if (!participant) {
      throw new NotFoundException(code);
    }
    return participant;
  }

  @Mutation(returns => Participant)
  async participantNew(
    @CurrentUser() user: CurrentUserPayload,
    @Args('newParticipantData') newParticipantData: NewParticipantInput,
  ): Promise<Participant> {
    // inject username into newTransactionData
    newParticipantData.loggedPersonId = user.userId;
    const participant = await this.participantService.create(newParticipantData);
    pubSub.publish(SubscriptionEvent.participantAdded, { [SubscriptionEvent.participantAdded]: participant });
    return participant;
  }

  @Mutation(returns => Participant)
  async participantUpdate(
    @Args('updateParticipantData') updateParticipantData: UpdateParticipantInput,
  ): Promise<Participant> {
    const participant = await this.participantService.update(updateParticipantData);
    pubSub.publish(SubscriptionEvent.participantUpdated, { [SubscriptionEvent.participantUpdated]: participant });
    return participant;
  }

  @Mutation(returns => Participant)
  async participantChangeIdentity(
    @Args('changeParticipantIdentityData') changeParticipantIdentityData: ChangeParticipantIdentityInput,
  ): Promise<Participant> {
    const participant = await this.participantService.changeIdentity(changeParticipantIdentityData);
    pubSub.publish(SubscriptionEvent.participantIdentityChanged, { [SubscriptionEvent.participantIdentityChanged]: participant });
    return participant;
  }

  @Subscription(returns => Participant)
  participantAdded() {
    return pubSub.asyncIterator(SubscriptionEvent.participantAdded);
  }

  @Subscription(returns => Participant)
  participantUpdated() {
    return pubSub.asyncIterator(SubscriptionEvent.participantUpdated);
  }

  @Subscription(returns => Participant)
  participantIdentityChanged() {
    return pubSub.asyncIterator(SubscriptionEvent.participantIdentityChanged);
  }
}
