import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST,
          port: Number(process.env.AUTH_SERVICE_PORT),
        },
      },
      {
        name: 'GENRES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.GENRES_SERVICE_HOST,
          port: Number(process.env.GENRES_SERVICE_PORT),
        },
      },
      {
        name: 'BOOKS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.BOOKS_SERVICE_HOST,
          port: Number(process.env.BOOKS_SERVICE_PORT),
        },
      },
      {
        name: 'AUTHORS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTHORS_SERVICE_HOST,
          port: Number(process.env.AUTHORS_SERVICE_PORT),
        },
      },
      {
        name: 'PUBLISHERS_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PUBLISHERS_SERVICE_HOST,
          port: Number(process.env.PUBLISHERS_SERVICE_PORT),
        },
      },
      {
        name: 'BORROW_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.BORROW_SERVICE_HOST,
          port: Number(process.env.BORROW_SERVICE_PORT),
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GlobalClientsModule {}
