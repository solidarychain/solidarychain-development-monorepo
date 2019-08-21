import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // called by LocalStrategy
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // protect expose password property to outside
      // use spread operator to assign password to password, and all the other user props to result
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // TODO: change with DTO
  // called by appController
  async login(user: any) {
    // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
    const payload = { sub: user.userId, username: user.username };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload),
    };
  }
}
