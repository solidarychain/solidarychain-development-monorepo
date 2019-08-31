import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { PersonModule } from './person/person.module';
import { ParticipantModule } from './participant/participant.module';

@Module({
  imports: [
    RecipesModule,
    PersonModule,
    ParticipantModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
})

export class ApplicationModule {}
