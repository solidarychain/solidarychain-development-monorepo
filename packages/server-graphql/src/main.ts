import { envVariables as envVariablesCommon } from '@convector-sample/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

const e: any = { ...envVariablesCommon };

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(e.httpPort)
    .then(() => console.log(`server started at port ${e.httpPort}`));
}

bootstrap();
