import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {UserLabel} from './entities/userLabel.tntity'
@Module({
  imports:[TypeOrmModule.forFeature([User,UserLabel])],
  controllers: [],//UserController
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
