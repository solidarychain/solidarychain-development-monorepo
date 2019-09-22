import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { envVariables as e } from './env';
import { redirectMiddleware } from './middleware/redirect-middleware';
// node module
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';

async function bootstrap() {
  // compose NestApplicationOptions
  const httpsOptions = {
    // private-key.pem
    key: fs.readFileSync('./config/server.key'),
    // public-certificate.pem
    cert: fs.readFileSync('./config/server.crt'),
  };
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  // enable cors
  app.enableCors();
  // redirect middleware
  app.use(redirectMiddleware);

  // initialize SwaggerModule
  const options = new DocumentBuilder()
    .setTitle(e.swaggerModuleTitle)
    .setDescription(e.swaggerModuleDescription)
    .setVersion(e.swaggerModuleVersion)
    // .addTag('person')
    .setSchemes('https')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(e.swaggerApiPath, app, document);

  // init app
  await app.init();

  // boosStrap servers
  http.createServer(server).listen(e.httpPort, () => {
    Logger.log(`HTTP Server running on port [${e.httpPort}]`);
  });
  https.createServer(httpsOptions, server).listen(e.httpsPort, () => {
    Logger.log(`HTTPS Server running on port [${e.httpsPort}]`);
  });
}
bootstrap();
