import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@api/common/entities/user.entity';
import { UsersController } from './users.controller';
import { HashService } from './hash.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  providers: [HashService],
})
export class UsersModule {}
