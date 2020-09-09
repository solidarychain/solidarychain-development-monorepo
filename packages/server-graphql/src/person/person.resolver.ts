import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { AddPersonAttributeInput, GetByAttributeInput, NewPersonInput, UpdatePersonInput, UpdatePersonPasswordInput, UpdatePersonProfileInput, UpsertCitizenCardInput } from './dto';
import { Person } from './models';
import { PersonService } from './person.service';
import CurrentUserPayload from '../common/types/current-user-payload';
import { SubscriptionEvent } from '../common/types';

const pubSub = new PubSub();

// @UseGuards(GqlAuthGuard)
@Resolver(of => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) { }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Person])
  async persons(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Person[]> {
    return this.personService.findAll(paginationArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Person])
  async personByAttribute(
    @Args('getByAttributeInput') getByAttributeInput: GetByAttributeInput,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Person | Person[]> {
    return this.personService.findByAttribute(getByAttributeInput, paginationArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Person])
  personComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Person | Person[]> {
    return this.personService.findComplexQuery(getByComplexQueryInput, paginationArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Person)
  async personById(
    @Args('id') id: string,
  ): Promise<Person> {
    const person = await this.personService.findOneById(id);
    if (!person) {
      throw new NotFoundException(id);
    }
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Person)
  async personByUsername(
    @Args('username') username: string,
  ): Promise<Person> {
    const person = await this.personService.findOneByUsername(username);
    if (!person) {
      throw new NotFoundException(username);
    }
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Person)
  async personByFiscalNumber(
    @Args('fiscalNumber') fiscalNumber: string,
  ): Promise<Person> {
    const person = await this.personService.findOneByFiscalnumber(fiscalNumber);
    if (!person) {
      throw new NotFoundException(fiscalNumber);
    }
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Person)
  async personProfile(
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    return await this.personService.findOneByUsername(user.username);
  }

  // unprotected method, person register don't use createdByPersonId
  @Mutation(returns => Person)
  async personRegister(
    @Args('newPersonData') newPersonData: NewPersonInput,
  ): Promise<Person> {
    const person = await this.personService.create(newPersonData);
    pubSub.publish(SubscriptionEvent.personAdded, { [SubscriptionEvent.personAdded]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personAddAttribute(
    @Args('personId') personId: string,
    @Args('addPersonAttributeData') addPersonAttributeData: AddPersonAttributeInput,
  ): Promise<Person> {
    const person = await this.personService.addAttribute(personId, addPersonAttributeData);  
    pubSub.publish(SubscriptionEvent.personAttributeAdded, { [SubscriptionEvent.personAttributeAdded]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personUpdate(
    @Args('updatePersonData') updatePersonData: UpdatePersonInput,
  ): Promise<Person> {
    const person = await this.personService.update(updatePersonData);
    pubSub.publish(SubscriptionEvent.personUpdated, { [SubscriptionEvent.personUpdated]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personUpdatePassword(
    @Args('updatePersonPasswordData') updatePersonPasswordData: UpdatePersonPasswordInput,
  ): Promise<Person> {
    const person = await this.personService.updatePassword(updatePersonPasswordData);
    pubSub.publish(SubscriptionEvent.personPasswordUpdated, { [SubscriptionEvent.personPasswordUpdated]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personUpdateProfile(
    @Args('updatePersonProfileData') updatePersonProfileData: UpdatePersonProfileInput,
  ): Promise<Person> {
    const person = await this.personService.updateProfile(updatePersonProfileData);
    pubSub.publish(SubscriptionEvent.personProfileUpdated, { [SubscriptionEvent.personProfileUpdated]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personUpsertCitizenCard(
    @Args('upsertCitizenCardData') upsertCitizenCardData: UpsertCitizenCardInput,
  ): Promise<Person> {
    const person = await this.personService.upsertCitizenCard(upsertCitizenCardData);
    pubSub.publish(SubscriptionEvent.personCitizenCardUpserted, { [SubscriptionEvent.personCitizenCardUpserted]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => Person)
  personAdded() {
    return pubSub.asyncIterator(SubscriptionEvent.personAdded);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => Person)
  personAttributeAdded() {
    return pubSub.asyncIterator(SubscriptionEvent.personAttributeAdded);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => Person)
  personUpdated() {
    return pubSub.asyncIterator(SubscriptionEvent.personUpdated);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => Person)
  personPasswordUpdated() {
    return pubSub.asyncIterator(SubscriptionEvent.personPasswordUpdated);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => Person)
  personProfileUpdated() {
    return pubSub.asyncIterator(SubscriptionEvent.personProfileUpdated);
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => Person)
  personCitizenCardUpserted() {
    return pubSub.asyncIterator(SubscriptionEvent.personCitizenCardUpserted);
  }
}
