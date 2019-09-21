import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { AuthService } from './auth.service';
import LoginPersonInput from '../person/dto/login-person.input';
import { AccessToken } from './models';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(returns => AccessToken)
  // @UseGuards(AuthGuard('local'))
  @UseGuards(GqlLocalAuthGuard)
  async personLogin(
    @Args('loginPersonData') loginPersonData: LoginPersonInput,
  ): Promise<AccessToken> {
    pubSub.publish('personLogged', { personLogged: loginPersonData.username });
    return await this.authService.login(loginPersonData);
  }

  @Subscription(returns => String)
  personLogged() {
    return pubSub.asyncIterator('personLogged');
  }
}
