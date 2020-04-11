import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { AddPersonAttributeInput, GetByAttributeInput, NewPersonInput } from './dto';
import { Person } from './models';
import { PersonService } from './person.service';
import CurrentUserPayload from '../common/types/current-user-payload';

const pubSub = new PubSub();

// @UseGuards(GqlAuthGuard)
@Resolver(of => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) { }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Person])
  async persons(
    @Args() personsArgs: PaginationArgs,
  ): Promise<Person[]> {
    return this.personService.findAll(personsArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Person])
  async personByAttribute(
    @Args('getByAttributeInput') getByAttributeInput: GetByAttributeInput,
    @Args() personsArgs: PaginationArgs,
  ): Promise<Person | Person[]> {
    return this.personService.findByAttribute(getByAttributeInput, personsArgs);
  }

  @Query(returns => [Person])
  personComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() personsArgs: PaginationArgs,
  ): Promise<Person | Person[]> {
    return this.personService.findComplexQuery(getByComplexQueryInput, personsArgs);
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
  async personByFiscalnumber(
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
    pubSub.publish('personAdded', { personAdded: person });
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Person)
  async personAddAttribute(
    @Args('personId') personId: string,
    @Args('addPersonAttributeData') addPersonAttributeData: AddPersonAttributeInput,
  ): Promise<Person> {
    const person = await this.personService.addAttribute(personId, addPersonAttributeData);
    return person;
  }

  @UseGuards(GqlAuthGuard)
  @Subscription(returns => Person)
  personAdded() {
    return pubSub.asyncIterator('personAdded');
  }
}
