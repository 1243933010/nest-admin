import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import {extname,join} from 'path'
// import { ConfigService } from '@nestjs/config';
@Module({
  imports:[
    MulterModule.register({
    storage:diskStorage({
      destination:join(__dirname,'../../src/images'),//join(__dirname,'../images')  '../../src/images' './src/images' 用绝对路径会放到dist文件夹，重新运行会被删除
      filename:(_,file,callback)=>{
        const filename = `${new Date().getTime()+extname(file.originalname)}`
        return callback(null,filename)
      }
    })
  })],
  controllers: [UploadController],
  providers: [UploadService]  //ConfigService
})
export class UploadModule {}
