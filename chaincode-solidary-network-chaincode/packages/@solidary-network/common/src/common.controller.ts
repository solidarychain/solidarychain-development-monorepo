import { Controller, Invokable } from '@worldsibu/convector-core';

@Controller('common')
export class CommonController {
  @Invokable()
  public async greeting() {
    return 'Hello from CommonController';
  }
}
