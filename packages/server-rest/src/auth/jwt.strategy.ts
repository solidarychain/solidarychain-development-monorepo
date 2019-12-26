import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './types/jwt-payload.interface';
import { envVariables as e } from '../env';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: e.accessTokenJwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
    };
  }
}
