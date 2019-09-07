import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import NewParticipantInput from './dto/new-participant.input';
import ParticipantArgs from './dto/participant.args';
import Participant from './models/participant.model';
import ParticipantService from './participant.service';

const pubSub = new PubSub();

@Resolver(of => Participant)
export default class ParticipantResolver {
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
