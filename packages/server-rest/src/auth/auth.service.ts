import { User } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envVariables as e } from '../env';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Person } from '@convector-sample/person-cc';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // called by LocalStrategy
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    let authorized: boolean;
    if (e.authServiceUseMokedUsers === 'true') {
      authorized = (user && user.password === pass);
    } else {
      authorized = this.bcryptValidate(pass, (user as Person).password);
    }

    if (authorized) {
      // protect expose password property to outside
      // use spread operator to assign password to password, and all the other user props to result
      // required .toJSON()
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  // called by appController
  async login(user: User) {
    // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
    const payload = { sub: user.id, username: user.username };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload),
    };
  }

  bcryptValidate = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
  }
}
