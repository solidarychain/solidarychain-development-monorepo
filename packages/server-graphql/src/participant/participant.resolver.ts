import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { NewParticipantInput, UpdateParticipantInput, ChangeParticipantIdentityData as ChangeParticipantIdentityInput } from './dto';
import { Participant } from './models';
import { ParticipantService } from './participant.service';
import { CurrentUser } from '../common/decorators';
import CurrentUserPayload from '../common/types/current-user-payload';
import { SubscriptionEvent } from '../common/types';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Participant)
export class ParticipantResolver {
  constructor(private readonly participantService: ParticipantService) { }

  @Query(returns => [Participant])
  participants(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Participant[]> {
    return this.participantService.findAll(paginationArgs);
  }

  @Query(returns => [Participant])
  participantComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Participant | Participant[]> {
    return this.participantService.findComplexQuery(getByComplexQueryInput, paginationArgs);
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
