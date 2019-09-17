import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthenticationError } from 'apollo-server-core';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // constructor(private readonly jwtService: JwtService) {
  //   super();
  // }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // GqlExecutionContext exposes corresponding methods for each argument, like getArgs(), getContext()
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    // return req;

    // the req parameter will contain a user property
    // (populated by Passport during the passport-local authentication flow)
    const authorization: string = req.headers.authentication;
    const token: string = authorization.toLowerCase().replace('bearer ', '');
    // const validToken = this.jwtService.verify(token);
    return super.canActivate(new ExecutionContextHost([req]));
    // return true;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('GraphqlJwtAuthGuard');
    }
    return user;
  }
}

// https://docs.nestjs.com/techniques/authentication#graphql

// @Injectable()
// export class GraphqlJwtAuthGuard extends AuthGuard('jwt') {
//   getRequest(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     return ctx.getContext().req;
//   }
// }
