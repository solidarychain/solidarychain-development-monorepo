import { Injectable, Logger } from '@nestjs/common';
import { PersonService } from '../person/person.service';

export type User = any;

// enable this to use moke users array, default to ledger person users
const useMokeUsers = false;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(private readonly personService: PersonService) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    // use above moke users array
    // if (useMokeUsers) {
      return this.users.find(user => user.username === username);
    // } else {
    //   try {
    //     return await this.personService.get(id);
    //   } catch (err) {
    //     Logger.error(JSON.stringify(err));
    //     const message: string = (err.responses[0]) ? err.responses[0].error.message : r.API_RESPONSE_INTERNAL_SERVER_ERROR;
    //     throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    //   }
    // }
  }
}
