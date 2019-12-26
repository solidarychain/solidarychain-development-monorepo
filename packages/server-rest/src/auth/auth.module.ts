import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { envVariables as e } from '../env';

@Module({
  imports: [
    // configure the JwtModule using register(), passing configuration object, and register a default strategy
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UsersModule,
    JwtModule.register({
      secret: e.accessTokenJwtSecret,
      signOptions: { expiresIn: e.accessTokenExpiresIn },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule { }
