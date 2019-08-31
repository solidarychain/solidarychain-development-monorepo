import { Injectable } from '@nestjs/common';
import { NewPersonInput } from './dto/new-person.input';
import { PersonArgs } from './dto/person.args';
import { Person } from './models/person';

@Injectable()
export class PersonService {
  async create(data: NewPersonInput): Promise<Person> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Person> {
    return {} as any;
  }

  async findAll(participantArgs: PersonArgs): Promise<Person[]> {
    return [] as Person[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
