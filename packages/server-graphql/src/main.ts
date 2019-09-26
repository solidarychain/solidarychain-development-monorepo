import { httpsOptions } from './config/express.config';
import { envVariables as e } from './env';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    ApplicationModule, { httpsOptions },

  );
  // middleware
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(e.httpsPort)
    .then(() => Logger.log(`graphql server started, endpoint exposed at https://localhost:${e.httpsPort}/graphql`));
}

bootstrap();
