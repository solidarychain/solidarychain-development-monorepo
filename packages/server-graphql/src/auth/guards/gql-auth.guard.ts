import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // GqlExecutionContext exposes corresponding methods for each argument, like getArgs(), getContext()
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    // the req parameter will contain a user property
    // (populated by Passport during the passport-local authentication flow)
    const authorization: string = (req.headers.authorization)
      ? req.headers.authorization
      : null;
    if (authorization) {
      // const token: string = authorization.toLowerCase().replace('bearer ', '');
      // const validToken = this.jwtService.verify(token);
      return super.canActivate(new ExecutionContextHost([req]));
    } else {
      return true;
    }
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
