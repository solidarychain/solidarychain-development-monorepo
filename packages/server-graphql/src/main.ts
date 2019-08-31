import { envVariables as e } from './env';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(e.httpPort)
    .then(() => console.log(`graphql server started. graphql endpoint exposed at http://localhost:${e.httpPort}/graphql`));
}

bootstrap();
