import { ArgsType } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { AuthService } from './auth.service';
import LoginPersonInput from '../person/dto/login-person.input';
import { AccessToken } from './models';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { GqlContext } from '../types';
import { UsersService } from '../users/users.service';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(returns => AccessToken)
  async personLogin(
    @Args('loginPersonData') loginPersonData: LoginPersonInput,
    @Context() { res, payload }: GqlContext,
  ): Promise<AccessToken> {
    // publish personLogged subscription
    pubSub.publish('personLogged', { personLogged: loginPersonData.username });
    // accessToken
    const accessToken = await this.authService.signJwtToken(loginPersonData);
    // assign jwt Payload to context
    // TODO: payload is assigned to context
    payload = this.authService.getJwtPayLoad(accessToken.accessToken);
    // get incremented tokenVersion
    const tokenVersion = this.usersService.usersStore.incrementTokenVersion(loginPersonData.username);
    // refreshToken
    const refreshToken: AccessToken = await this.authService.signRefreshToken(loginPersonData, tokenVersion);
    // send refresh token
    this.authService.sendRefreshToken(res, refreshToken);
    // return accessToken
    return accessToken;
  }

  // Don't expose this resolver, only used in development environments
  @Mutation(returns => Boolean)
  async revokeUserRefreshTokens(
    @Args('username') username: string,
  ): Promise<boolean> {
    // invalidate user tokens increasing tokenVersion, this way last tokenVersion of refreshToken will be invalidate
    // when user tries to use it in /refresh-token and current version is greater than refreshToken.tokenVersion
    this.usersService.usersStore.incrementTokenVersion(username);
    return true;
  }

  @Subscription(returns => String)
  personLogged() {
    return pubSub.asyncIterator('personLogged');
  }
}
