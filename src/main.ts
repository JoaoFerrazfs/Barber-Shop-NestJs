import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Contents')
    .setDescription('The contents API description')
    .setVersion('1.0')
    .addTag('Contents')
    .addServer('http://localhost:3000/')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('OAS', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
