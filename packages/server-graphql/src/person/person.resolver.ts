import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import NewPersonInput from './dto/new-person.input';
import PersonArgs from './dto/person.args';
import Person from './models/person.model';
import PersonService from './person.service';
import GetByAttributeInput from './dto/get-by-attribute.input';
import AddPersonAttributeInput from './dto/add-person-attribute.input';

const pubSub = new PubSub();

@Resolver(of => Person)
export default class PersonResolver {
  constructor(private readonly personService: PersonService) { }

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

  @Query(returns => [Person])
  async persons(
    @Args() personsArgs: PersonArgs,
  ): Promise<Person[]> {
    return this.personService.findAll(personsArgs);
  }

  @Query(returns => [Person])
  async personByAttribute(
    @Args('getByAttributeInput') getByAttributeInput: GetByAttributeInput,
    @Args() personsArgs: PersonArgs,
  ): Promise<Person | Person[]> {
    return this.personService.findByAttribute(getByAttributeInput, personsArgs);
  }

  @Mutation(returns => Person)
  async personNew(
    @Args('newPersonData') newPersonData: NewPersonInput,
  ): Promise<Person> {
    const person = await this.personService.create(newPersonData);
    pubSub.publish('personAdded', { personAdded: person });
    return person;
  }

  // TODO:
  @Mutation(returns => Person)
  async personAddAttribute(
    @Args('personId') personId: string,
    @Args('addPersonAttributeData') addPersonAttributeData: AddPersonAttributeInput,
  ): Promise<Person> {
    const person = await this.personService.personAddAttribute(personId, addPersonAttributeData);
    return person;
  }

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
