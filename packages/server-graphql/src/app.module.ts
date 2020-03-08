import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { ConnectionParams } from 'subscriptions-transport-ws';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CauseModule } from './cause/cause.module';
import { envVariables as e } from './env';
import { ParticipantModule } from './participant/participant.module';
import { PersonModule } from './person/person.module';
import { TransactionModule } from './transaction/transaction.module';
import { GqlContext, GqlContextPayload } from './types';
import { UsersModule } from './users/users.module';
import { mapKeysToLowerCase } from './utils';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    // chaincode modules
    ParticipantModule,
    PersonModule,
    CauseModule,
    TransactionModule,
    // apolloServer config: use forRootAsync to import AuthModule and inject AuthService
    GraphQLModule.forRootAsync({
      // import AuthModule
      imports: [AuthModule],
      // inject authService
      useFactory: async (authService: AuthService) => ({
        debug: true,
        playground: true,
        installSubscriptionHandlers: true,
        autoSchemaFile: 'schema.gql',
        // pass the original req and res object into the graphql context,
        // get context with decorator `@Context() { req, res, payload, connection }: GqlContext`
        // req, res used in http/query&mutations, connection used in webSockets/subscriptions
        context: ({ req, res, payload, connection }: GqlContext) => ({ req, res, payload, connection }),
        // configure graphql cors here
        cors: {
          origin: e.corsOriginReactFrontend,
          credentials: true,
        },
        // subscriptions/webSockets authentication
        // NOTES.md: How to use AuthGuard/Authentication with Apollo Subscriptions
        subscriptions: {
          // get headers
          onConnect: (connectionParams: ConnectionParams) => {
            // convert header keys to lowercase
            const connectionParamsLowerKeys = mapKeysToLowerCase(connectionParams);
            // get authToken from authorization header
            const authToken: string = ('authorization' in connectionParamsLowerKeys)
              && connectionParamsLowerKeys.authorization.split(' ')[1];
            if (authToken) {
              // verify authToken/getJwtPayLoad
              const jwtPayload: GqlContextPayload = authService.getJwtPayLoad(authToken);
              // the user/jwtPayload object found will be available as context.currentUser/jwtPayload in your GraphQL resolvers
              return { currentUser: jwtPayload.username, jwtPayload, headers: connectionParamsLowerKeys };
            }
            throw new AuthenticationError('authToken must be provided');
          },
        },
      }),
      // inject: AuthService
      inject: [AuthService],
    }),
  ],
})

export class ApplicationModule { }
