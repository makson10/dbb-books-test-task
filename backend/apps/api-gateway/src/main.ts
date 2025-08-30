import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

// declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_BASE_URL || 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('DBB-books')
    .setDescription('API for DBB-books')
    .setVersion('1.0')
    .addBearerAuth()
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

  await app.listen(process.env.APP_PORT ?? 4000);

  //   if (module.hot) {
  //     module.hot.accept();
  //     module.hot.dispose(() => app.close());
  //   }
}

bootstrap();
