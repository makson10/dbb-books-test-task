import { NestFactory } from '@nestjs/core';
import { BorrowModule } from './borrow.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BorrowModule,
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
