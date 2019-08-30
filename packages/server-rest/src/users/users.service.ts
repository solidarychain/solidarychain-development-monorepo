import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { envVariables as e } from '../env';
import { appConstants as c } from '../constants';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(private readonly personService: PersonService) {
    this.users = [
      {
        id: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        id: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        id: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    if (e.authServiceUseMokedUsers === 'true') {
      return this.users.find(user => user.username === username);
    } else {
      try {
        return await this.personService.getByUsername(username);
      } catch (err) {
        Logger.error(JSON.stringify(err));
        const message: string = (err.responses[0]) ? err.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
        throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
