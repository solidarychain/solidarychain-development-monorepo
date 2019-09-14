import { Module } from '@nestjs/common';
import DateScalar from '../common/scalars/date.scalar';
import PersonResolver from './person.resolver';
import PersonService from './person.service';
// import { EasyconfigModule, JsonWebTokenModule } from '@koakh/nestjs-auth-quick-config';

@Module({
  imports: [
    // EasyconfigModule.register({ path: './config/.env' }),
    // // the trick is import the module, not the service here
    // JsonWebTokenModule,
    // @koakh/nestjs-auth-quick-config
    // AuthQuickConfigModule.register({
    //   jwtSecret: 'secretKey',
    //   jwtExpiresIn: '1h',
    //   // TODO:
    //   getByUsername: (username: string) => 'admin',
    // }),
    // // the trick is import the module, not the service here
    // AuthModule,
  ],
  providers: [PersonResolver, PersonService, DateScalar],
})

export default class PersonModule { }
