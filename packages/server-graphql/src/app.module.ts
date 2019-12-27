import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { ParticipantModule } from './participant/participant.module';
import { PersonModule } from './person/person.module';
import { GqlContext } from './types';
import { UsersModule } from './users/users.module';
import { envVariables as e } from './env';

@Module({
  imports: [
    AuthModule,
    ParticipantModule,
    PersonModule,
    UsersModule,
    // ApolloServer config
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      // pass the original req and res object into the graphql context,
      // get context with decorator `@Context() { req, res, payload }: GqlContext`
      context: ({ req, res, payload }: GqlContext) => ({ req, res, payload }),
      // configure graphql cors here
      cors: {
        origin: e.corsOriginReactFrontend,
        credentials: true,
      },
    }),
  ],
})

export class ApplicationModule { }
