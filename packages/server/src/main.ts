import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerApiPath, swaggerModuleDescription, swaggerModuleTagPerson, swaggerModuleTitle, swaggerModuleVersion, httpPort, httpsPort } from './env';
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
  // enable csrf
  // app.use(csurf({ cookie: true }));
  // redirect middleware
  app.use(redirectMiddleware);
  // custom cors
  // this.expressApp.use(allowCrossDomainMiddleware);
  // tokenGuard
  // this.expressApp.use(tokenGuardMiddleware);

  // initialize SwaggerModule
  const options = new DocumentBuilder()
    .setTitle(swaggerModuleTitle)
    .setDescription(swaggerModuleDescription)
    .setVersion(swaggerModuleVersion)
    .addTag(swaggerModuleTagPerson)
    .setSchemes('https')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerApiPath, app, document);

  // init app
  await app.init();

  // boostrap servers
  http.createServer(server).listen(httpPort, () => {
    Logger.log(`HTTP Server running on port [${httpPort}]`);
  });
  https.createServer(httpsOptions, server).listen(httpsPort, () => {
    Logger.log(`HTTPS Server running on port [${httpsPort}]`);
  });
}
bootstrap();
