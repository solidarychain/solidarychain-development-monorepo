import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { AuthService } from './auth/auth.service';
import { GraphqlLocalAuthGuard } from './auth/graphql-local-auth.guard';
import LoginPersonInput from './person/dto/login-person.input';
import { AccessToken } from './auth/models/access-token.model';

const pubSub = new PubSub();

@Resolver()
export class AppResolver {
  constructor(private readonly authService: AuthService) { }
  //   async login(data: LoginPersonInput): Promise<string> {
  //   try {
  //     const user = await this.usersService.findOne(data.username);
  //     // const result: AccessToken = await this.authService.login(data.username);
  //     // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
  //     const payload = { username: data.username };
  //     // generate JWT from a subset of the user object properties
  //     // const accessToken = this.jwtService.sign(payload);
  //     const result: AccessToken = { access_token: 'accessToken' };
  //     return result.access_token;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Mutation(returns => AccessToken)
  @UseGuards(GraphqlLocalAuthGuard)
  async personLogin(
    @Args('loginPersonData') loginPersonData: LoginPersonInput,
  ): Promise<AccessToken> {
    pubSub.publish('personLogged', { personLogged: loginPersonData.username });
    return await this.authService.login(loginPersonData);
  }
}
