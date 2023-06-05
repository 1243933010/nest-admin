import { ArgumentMetadata, Injectable, PipeTransform,HttpException,HttpStatus } from '@nestjs/common';
import {plainToInstance} from 'class-transformer'
import {validate} from 'class-validator'
import {UpdateUserDto} from './dto/update-user.dto'
@Injectable()
export class UserPipe implements PipeTransform {
  async transform(value: UpdateUserDto, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype,value);
    const errors =  await validate(DTO);
    console.log(errors[0],'___',metadata,value,HttpStatus.BAD_REQUEST);
    if(errors.length){
       //throw new HttpException(errors,HttpStatus.BAD_REQUEST);
       throw new HttpException(Object.values(errors[0].constraints)[0],HttpStatus.BAD_REQUEST);
      //return {code:400,message:'111'}
      //throw new HttpException('111',null);
    }
    console.log(value,'++++++++++++')
    return value;
  }
}
