import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CurrentUser, Roles } from '../auth/decorators';
import { UserRoles } from '../auth/enums';
import { GqlAuthGuard, GqlRolesGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { SubscriptionEvent } from '../common/enums';
import CurrentUserPayload from '../common/types/current-user-payload';
import { ChangeParticipantIdentityData as ChangeParticipantIdentityInput, NewParticipantInput, UpdateParticipantInput } from './dto';
import { Participant } from './models';
import { ParticipantService } from './participant.service';

const pubSub = new PubSub();
@UseGuards(GqlAuthGuard)
@Resolver(of => Participant)
export class ParticipantResolver {
  constructor(private readonly participantService: ParticipantService) { }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Participant])
  participants(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Participant | Participant[]> {
    return this.participantService.findAll(paginationArgs, user);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Participant])
  participantComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Participant | Participant[]> {
    return this.participantService.findComplexQuery(getByComplexQueryInput, paginationArgs, user);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => Participant)
  async participantById(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Participant> {
    const participant = await this.participantService.findOneById(id, user);
    if (!participant.id) {
      throw new NotFoundException(id);
    }
    return participant;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => Participant)
  async participantByCode(
    @Args('code') code: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Participant> {
    const participant = await this.participantService.findOneByCode(code, user);
    if (!participant.id) {
      throw new NotFoundException(code);
    }
    return participant;
  }

  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Participant)
  async participantNew(
    @Args('newParticipantData') newParticipantData: NewParticipantInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Participant> {
    // inject username into newTransactionData
    newParticipantData.loggedPersonId = user.userId;
    const participant = await this.participantService.create(newParticipantData, user);
    pubSub.publish(SubscriptionEvent.participantAdded, { [SubscriptionEvent.participantAdded]: participant });
    return participant;
  }

  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Participant)
  async participantUpdate(
    @Args('updateParticipantData') updateParticipantData: UpdateParticipantInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Participant> {
    const participant = await this.participantService.update(updateParticipantData, user);
    pubSub.publish(SubscriptionEvent.participantUpdated, { [SubscriptionEvent.participantUpdated]: participant });
    return participant;
  }

  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Participant)
  async participantChangeIdentity(
    @Args('changeParticipantIdentityData') changeParticipantIdentityData: ChangeParticipantIdentityInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Participant> {
    const participant = await this.participantService.changeIdentity(changeParticipantIdentityData, user);
    pubSub.publish(SubscriptionEvent.participantIdentityChanged, { [SubscriptionEvent.participantIdentityChanged]: participant });
    return participant;
  }

  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Participant)
  participantAdded(
    @CurrentUser() user: CurrentUserPayload,    
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.participantAdded);
  }

  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Participant)
  participantUpdated(
    @CurrentUser() user: CurrentUserPayload,    
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.participantUpdated);
  }

  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Participant)
  participantIdentityChanged(
    @CurrentUser() user: CurrentUserPayload,    
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.participantIdentityChanged);
  }
}
