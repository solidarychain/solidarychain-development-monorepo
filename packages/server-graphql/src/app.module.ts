import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import ParticipantModule from './participant/participant.module';
import PersonModule from './person/person.module';
import PersonService from './person/person.service';
import { AuthQuickConfigModule, UsersModule, AuthService, UsersService } from '@koakh/nestjs-auth-quick-config';

@Module({
  imports: [
    // TODO : remove recipes
    RecipesModule,
    PersonModule,
    PersonService,
    ParticipantModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    // @koakh/nestjs-auth-quick-config
    // UsersService,
    // AuthService,
    AuthQuickConfigModule.register({
      jwtSecret: 'secretKey',
      jwtExpiresIn: '1h',
      getByUsername: (username: string) => 'admin',
    }),
  ],
})

export class ApplicationModule { }
