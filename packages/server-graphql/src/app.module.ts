import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import ParticipantModule from './participant/participant.module';
import PersonModule from './person/person.module';

@Module({
  imports: [
    PersonModule,
    ParticipantModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})

export class ApplicationModule { }
