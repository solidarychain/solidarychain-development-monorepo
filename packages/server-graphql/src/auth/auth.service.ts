import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignOptions } from 'jsonwebtoken';
import AccessToken from '../common/types/access-token';
import { GqlContextPayload } from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  // called by GqlLocalAuthGuard
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const authorized = this.bcryptValidate(pass, user.password);
      if (authorized) {
        const { password, ...result } = user;
        // we could do a database lookup in our validate() method to extract more information about the user,
        // resulting in a more enriched user object being available in our Request
        return result;
      }
    }
    return null;
  }

  async signJwtToken(user: any, options?: SignOptions): Promise<AccessToken> {
    // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
    const payload = { username: user.username, sub: user.userId };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload, options),
    };
  }

  getJwtPayLoad(token: string): GqlContextPayload {
    return this.jwtService.verify(token);
  }

  bcryptValidate = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
  }
}
