import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAddress } from 'src/user-address/entities/user-address.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User, UserAddress]), ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
