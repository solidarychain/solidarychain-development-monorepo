import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { AuthService } from './auth/auth.service';
import { GqlLocalAuthGuard } from './auth/gql-local-auth.guard';
import LoginPersonInput from './person/dto/login-person.input';
import { AccessToken } from './auth/models/access-token.model';

const pubSub = new PubSub();

@Resolver()
export class AppResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(returns => AccessToken)
  @UseGuards(GqlLocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
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
