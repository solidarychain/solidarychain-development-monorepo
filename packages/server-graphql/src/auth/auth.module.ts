import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envVariables as e } from '../env';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: e.jwtSecret,
      signOptions: { expiresIn: e.jwtExpiresIn },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})

export class AuthModule { }
