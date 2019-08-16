import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerModuleTitle, swaggerModuleDescription, swaggerModuleVersion, swaggerModuleTagPerson, swaggerApiPath } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // initialize SwaggerModule
  const options = new DocumentBuilder()
    .setTitle(swaggerModuleTitle)
    .setDescription(swaggerModuleDescription)
    .setVersion(swaggerModuleVersion)
    .addTag(swaggerModuleTagPerson)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerApiPath, app, document);

  await app.listen(3000);
}
bootstrap();
