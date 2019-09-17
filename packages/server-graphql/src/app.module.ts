import { AppResolver } from './app.resolver';
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
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      // pass the original req object into the graphql context
      context: ({ req }) => ({ req }),
      // https://stackoverflow.com/questions/54532263/applying-middleware-like-mechanism-to-resolvers-queries-and-mutations
      // context: (context) => {
      //   let req = context.req;
      //   if (context.connection) {
      //     req = context.connection.context.req;
      //   }
      //   return { req };
      // },
    }),
  ],
  providers: [AppResolver],
})

export class ApplicationModule { }
