import { UseGuards, Logger } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription, Context } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { AuthService } from './auth.service';
import LoginPersonInput from '../person/dto/login-person.input';
import { AccessToken } from './models';
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard';
import { GqlContext, GqlContextPayload } from 'src/types';
import { envVariables as e } from '../env';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

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
    payload = this.authService.getJwtPayLoad(accessToken.accessToken);
    // refreshToken
    const refreshToken = await this.authService.signJwtToken(loginPersonData, { expiresIn: e.refreshTokenExpiresIn });
    res.cookie('jid', refreshToken, {
      // prevent javascript access
      httpOnly: true,
    });
    // return accessToken
    return accessToken;
  }

  @Subscription(returns => String)
  personLogged() {
    return pubSub.asyncIterator('personLogged');
  }
}
