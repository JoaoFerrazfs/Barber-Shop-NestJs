import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: ['https://joaoferrazfs.github.io'] });

  const config = new DocumentBuilder()
    .setTitle('Barber Shop Nest')
    .setDescription('The Barber shop APIs')
    .setVersion('1.0')
    .addServer('http://localhost:3000/')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('OAS', app, documentFactory, {
    jsonDocumentUrl: 'OAS/json',
    customSiteTitle: 'Barber Shop Nest',
    yamlDocumentUrl: 'OAS/yaml',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
