import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { appConstants as c } from '../constants';
import { PersonService } from '../person/person.service';
import Person from '../person/models/person.model';
import UsersStore from './users.store';

export type User = any;

@Injectable()
export class UsersService {
  // init usersStore
  usersStore: UsersStore = new UsersStore();

  constructor(
    private readonly personService: PersonService,
  ) { }
  async findOneByUsername(username: string): Promise<Person | undefined> {
    try {
      return await this.personService.findOneByUsername(username);
    } catch (err) {
      Logger.error(JSON.stringify(err));
      const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
