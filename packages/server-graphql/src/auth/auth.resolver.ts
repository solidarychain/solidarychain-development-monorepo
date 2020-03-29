import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { AuthService } from './auth.service';
import { LoginPersonInput } from '../person/dto';
import { AccessToken } from './models';
import { GqlLocalAuthGuard } from './guards';
import { GqlContext } from '../types';
import { UsersService } from '../users/users.service';
import { Person } from '../person/models/person.model';
import { PersonLoginResponse } from './models';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(returns => PersonLoginResponse)
  async personLogin(
    @Args('loginPersonData') loginPersonData: LoginPersonInput,
    @Context() { res, payload }: GqlContext,
  ): Promise<PersonLoginResponse> {
    // publish personLogged subscription
    pubSub.publish('personLogged', { personLogged: loginPersonData.username });
    // get person
    const person: Person = await this.usersService.findOneByUsername(loginPersonData.username);
    // accessToken: add some person data to it, like id and roles
    const signJwtTokenDto = { ...loginPersonData, userId: person.id, roles: person.roles };
    const { accessToken } = await this.authService.signJwtToken(signJwtTokenDto);
    // TODO: payload is assigned to context?
    // assign jwt Payload to context
    payload = this.authService.getJwtPayLoad(accessToken);
    // get incremented tokenVersion
    const tokenVersion = this.usersService.usersStore.incrementTokenVersion(loginPersonData.username);
    // refreshToken
    const refreshToken: AccessToken = await this.authService.signRefreshToken(signJwtTokenDto, tokenVersion);
    // send refresh token
    this.authService.sendRefreshToken(res, refreshToken);
    // return loginPersonResponse
    return { user: person, accessToken };
  }

  @Mutation(returns => Boolean)
  async personLogout(
    @Context() { res, payload }: GqlContext,
  ): Promise<boolean> {
    // send empty refreshToken, with same name jid, etc, better than res.clearCookie
    // this will invalidate the browser cookie refreshToken, only work with browser, not with insomnia etc
    this.authService.sendRefreshToken(res, { accessToken: '' });
    return true;
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
