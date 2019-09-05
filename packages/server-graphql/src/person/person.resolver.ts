import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewPersonInput } from './dto/new-person.input';
import { PersonArgs } from './dto/person.args';
import { Person } from './models/person.model';
import { PersonService } from './person.service';
import { GetByAttributeInput } from './dto/get-by-attribute.input';

const pubSub = new PubSub();

@Resolver(of => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) { }

  @Query(returns => Person)
  async person(@Args('id') id: string): Promise<Person> {
    const person = await this.personService.findOneById(id);
    if (!person) {
      throw new NotFoundException(id);
    }
    return person;
  }

  @Query(returns => [Person])
  async persons(@Args() personsArgs: PersonArgs): Promise<Person[]> {
    return this.personService.findAll(personsArgs);
  }

  // TODO:: test with more than one user
  @Query(returns => [Person])
  async getByAttribute(
    @Args('getByAttributeInput') getByAttributeInput: GetByAttributeInput,
    @Args() personsArgs: PersonArgs): Promise<Person | Person[]> {
    return this.personService.getByAttribute(getByAttributeInput, personsArgs);
  }

  // TODO:
  // @Query(returns => [Person])
  // async getByUsername(@Args('username') username: string): Promise<Person> {
  //   return this.personService.getByUsername(username);
  // }

  @Mutation(returns => Person)
  async addPerson(
    @Args('newPersonData') newPersonData: NewPersonInput,
  ): Promise<Person> {
    const person = await this.personService.create(newPersonData);
    pubSub.publish('personAdded', { personAdded: person });
    return person;
  }

  // TODO:
  // @Mutation(returns => Person)
  // async addAttribute(
  //   @Args('newPersonData') newPersonData: NewPersonInput,
  // ): Promise<Person> {
  //   const person = await this.personService.create(newPersonData);
  //   pubSub.publish('personAdded', { personAdded: person });
  //   return person;
  // }

  // TODO:
  // @Mutation(returns => Person)
  // async login(
  //   @Args('newPersonData') newPersonData: NewPersonInput,
  // ): Promise<Person> {
  //   const person = await this.personService.create(newPersonData);
  //   pubSub.publish('personAdded', { personAdded: person });
  //   return person;
  // }

  @Subscription(returns => Person)
  personAdded() {
    return pubSub.asyncIterator('personAdded');
  }
}
