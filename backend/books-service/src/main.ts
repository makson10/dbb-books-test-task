import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BooksModule } from './books.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BooksModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: Number(process.env.APP_PORT),
      },
    },
  );
  await app.listen();
}
bootstrap();
