import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('DBB-books')
    .setDescription('API for DBB-books')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    'api',
    app,
    { ...document, openapi: '3.1.0' },
    {
      yamlDocumentUrl: '/api/schema.yaml',
    },
  );

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
