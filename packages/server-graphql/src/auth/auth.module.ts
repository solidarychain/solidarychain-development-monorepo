import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { envVariables as e } from '../env';
import { UsersModule } from './../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    // configure the JwtModule using register(), passing configuration object, and register a default strategy
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: e.jwtSecret,
      signOptions: { expiresIn: e.jwtExpiresIn },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule { }
