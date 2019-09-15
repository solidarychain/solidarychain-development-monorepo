import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ParticipantModule } from './participant/participant.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PersonModule,
    ParticipantModule,
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      // pass the original req object into the graphql context
      context: ({ req }) => ({ req }),
    }),
  ],
})

export class ApplicationModule { }
