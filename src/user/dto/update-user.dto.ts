import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsNotEmpty,IsString,IsArray} from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty({message:'名称不能为空'})
    @IsString()
    username :string

    role:string

    avatar:string

    id:number

    @IsArray({message:'labelList必须为数组格式'})
    //@IsNotEmpty({message:'labelList不能为空'})
    labelList:object[]
}
