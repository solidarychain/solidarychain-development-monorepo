import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewPersonInput } from './dto/new-person.input';
import { PersonArgs } from './dto/person.args';
import { Person } from './models/person.model';
import { PersonService } from './person.service';

const pubSub = new PubSub();

@Resolver(of => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query(returns => Person)
  async person(@Args('id') id: string): Promise<Person> {
    const person = await this.personService.findOneById(id);
    if (!person) {
      throw new NotFoundException(id);
    }
    return person;
  }

  @Query(returns => [Person])
  persons(@Args() personsArgs: PersonArgs): Promise<Person[]> {
    return this.personService.findAll(personsArgs);
  }

  @Mutation(returns => Person)
  async addPerson(
    @Args('newPersonData') newPersonData: NewPersonInput,
  ): Promise<Person> {
    const person = await this.personService.create(newPersonData);
    pubSub.publish('personAdded', { personAdded: person });
    return person;
  }

  @Subscription(returns => Person)
  personAdded() {
    return pubSub.asyncIterator('personAdded');
  }
}
