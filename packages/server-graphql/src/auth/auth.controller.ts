import { Controller, HttpStatus, Post, Request, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlContextPayload } from 'src/types';
import { envVariables as e } from '../env';
import { UsersService } from '../users/users.service';
import { User } from './../users/users.service';
import { AuthService } from './auth.service';
import { AccessToken } from './models/access-token.model';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) { }
  // TODO: add redirect endpoint/ to /graphql

  // for security purposes, refreshToken cookie only works in this specific route,
  // to request a new accessToken, this prevent /graphql to works with cookie

  @Post('/refresh-token')
  async refreshToken(
    @Request() req,
    @Response() res,
  ): Promise<any> {
    // Logger.log('headers', JSON.stringify(req.headers, undefined, 2));
    // Logger.log('cookies', JSON.stringify(req.cookies, undefined, 2));
    const token: any = req.cookies.jid;
    const invalidPayload = () => res.status(HttpStatus.UNAUTHORIZED).send({ valid: false, accessToken: '' });
    // check jid token
    if (!token) {
      return invalidPayload();
    }

    let payload: GqlContextPayload;
    try {
      payload = this.jwtService.verify(token.accessToken, e.refreshTokenJwtSecret);
    } catch (error) {
      // Logger.log(error);
      return invalidPayload();
    }

    // token is valid, send back accessToken
    const user: User = await this.usersService.findOneByUsername(payload.username);
    // check jid token
    if (!user) {
      return invalidPayload();
    }

    const { accessToken }: AccessToken = await this.authService.signJwtToken(user);
    res.send({ valid: true, accessToken });
  }
}
