import { Injectable, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import LoginPersonInput from '../../person/dto/login-person.input';

@Injectable()
export class GqlLocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    // get loginPersonData from context args
    const loginPersonData: LoginPersonInput = ctx.getArgs().loginPersonData;
    // call authService validateUser
    const user = await this.authService.validateUser(loginPersonData.username, loginPersonData.password);
    // if not null is valid
    return (user);
  }

  /**
   * Passport expects a validate() method with the following signature: validate(username: string, password:string): any
   */
  // TODO: this is required?
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
