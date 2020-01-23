import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import NewParticipantInput from './dto/new-transaction.input';
import ParticipantArgs from './dto/transaction.args';
import Participant from './models/transaction.model';
import { ParticipantService } from './participant.service';
import { GqlAuthGuard } from '../auth/guards';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Participant)
export class ParticipantResolver {
  constructor(private readonly participantService: ParticipantService) { }

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

  @Query(returns => [Participant])
  participants(
    @Args() participantsArgs: ParticipantArgs,
  ): Promise<Participant[]> {
    return this.participantService.findAll(participantsArgs);
  }

  @Mutation(returns => Participant)
  async participantNew(
    @Args('newParticipantData') newParticipantData: NewParticipantInput,
  ): Promise<Participant> {
    const participant = await this.participantService.create(newParticipantData);
    // fire subscription
    pubSub.publish('participantAdded', { participantAdded: participant });
    return participant;
  }

  @Subscription(returns => Participant)
  participantAdded() {
    return pubSub.asyncIterator('participantAdded');
  }
}
