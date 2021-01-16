import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { SubscriptionEvent } from '../common/enums';
import CurrentUserPayload from '../common/types/current-user-payload';
import { AddPersonAttributeInput, GetByAttributeInput, NewPersonInput, UpdatePersonInput, UpdatePersonPasswordInput, UpdatePersonProfileInput, UpsertCitizenCardInput } from './dto';
import { Person } from './models';
import { PersonService } from './person.service';

const pubSub = new PubSub();

// @UseGuards(GqlAuthGuard)
@Resolver(of => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) { }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Person])
  async persons(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person | Person[]> {
    return this.personService.findAll(paginationArgs, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Person])
  async personByAttribute(
    @Args('getByAttributeInput') getByAttributeInput: GetByAttributeInput,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person | Person[]> {
    return this.personService.findByAttribute(getByAttributeInput, paginationArgs, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Person])
  personComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person | Person[]> {
    return this.personService.findComplexQuery(getByComplexQueryInput, paginationArgs, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Person)
  async personById(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    const person = await this.personService.findOneById(id, user);
    if (!person) {
      throw new NotFoundException(id);
    }
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Person)
  async personByUsername(
    @Args('username') username: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    const person = await this.personService.findOneByUsername(username, user);
    if (!person) {
      throw new NotFoundException(username);
    }
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => Person)
  async personByFiscalNumber(
    @Args('fiscalNumber') fiscalNumber: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    const person = await this.personService.findOneByFiscalnumber(fiscalNumber, user);
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
    return await this.personService.findOneByUsername(user.username, user);
  }

  // unprotected method, person register don't use createdByPersonId
  @Mutation(returns => Person)
  async personRegister(
    @Args('newPersonData') newPersonData: NewPersonInput,
  ): Promise<Person> {
    const person = await this.personService.create(newPersonData, null);
    pubSub.publish(SubscriptionEvent.personAdded, { [SubscriptionEvent.personAdded]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personAddAttribute(
    @Args('personId') personId: string,
    @Args('addPersonAttributeData') addPersonAttributeData: AddPersonAttributeInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    const person = await this.personService.addAttribute(personId, addPersonAttributeData, user);
    pubSub.publish(SubscriptionEvent.personAttributeAdded, { [SubscriptionEvent.personAttributeAdded]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personUpdate(
    @Args('updatePersonData') updatePersonData: UpdatePersonInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    const person = await this.personService.update(updatePersonData, user);
    pubSub.publish(SubscriptionEvent.personUpdated, { [SubscriptionEvent.personUpdated]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personUpdatePassword(
    @Args('updatePersonPasswordData') updatePersonPasswordData: UpdatePersonPasswordInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    const person = await this.personService.updatePassword(updatePersonPasswordData, user);
    pubSub.publish(SubscriptionEvent.personPasswordUpdated, { [SubscriptionEvent.personPasswordUpdated]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personUpdateProfile(
    @Args('updatePersonProfileData') updatePersonProfileData: UpdatePersonProfileInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    const person = await this.personService.updateProfile(updatePersonProfileData, user);
    pubSub.publish(SubscriptionEvent.personProfileUpdated, { [SubscriptionEvent.personProfileUpdated]: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personUpsertCitizenCard(
    @Args('upsertCitizenCardData') upsertCitizenCardData: UpsertCitizenCardInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Person> {
    const person = await this.personService.upsertCitizenCard(upsertCitizenCardData, user);
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
