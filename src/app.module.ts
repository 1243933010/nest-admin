import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './user/user.controller';
import { UploadModule } from './upload/upload.module';
import { ConfigModule,ConfigService } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleService } from './modules/schedule/schedule.service';
import { LoopTaskModule } from './loop-task/loop-task.module';

let envFilePath = ['.env'];
if(process.env.RUNNING_ENV=='dev'){
  envFilePath.push('.env.dev')
}else{
  envFilePath.push('.env.pro')
}
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type:"mysql",
      username:'root',
      password:'ChongShao123',
      host:'localhost',
      port:3306,
      database:'nuxtproject',
      entities:[__dirname + '/**/*.entity{.ts.js}'],
      synchronize:true,
      retryDelay:500,
      retryAttempts:10,
      autoLoadEntities:true
    }),
    UploadModule,
    ScheduleModule.forRoot(),
    LoopTaskModule
  ],
  controllers: [AppController,UserController],
  providers: [AppService,  ScheduleService],
})
export class AppModule {}
