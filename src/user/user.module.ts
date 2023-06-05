import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {UserLabel} from './entities/userLabel.tntity'
import { Permission } from 'src/permission/entities/permission.entity';
@Module({
  imports:[TypeOrmModule.forFeature([User,Permission,UserLabel])],
  controllers: [],//UserController
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
