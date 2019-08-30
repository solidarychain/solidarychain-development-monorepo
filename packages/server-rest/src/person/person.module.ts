import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})

export class PersonModule { }
