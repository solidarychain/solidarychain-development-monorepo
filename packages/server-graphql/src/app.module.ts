import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ParticipantModule } from './participant/participant.module';
import { PersonModule } from './person/person.module';

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
      // get context with decorator `@Context() { req, res }: GqlContext`
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
})

export class ApplicationModule { }
