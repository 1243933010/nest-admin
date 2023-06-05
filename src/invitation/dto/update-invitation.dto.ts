import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitationDto } from './create-invitation.dto';
import {IsNotEmpty,IsString,IsArray,IsNumber} from 'class-validator'
export class UpdateInvitationDto extends PartialType(CreateInvitationDto) {
    // @IsNumber()
    // id:number

    @IsString()
    title:string

    @IsString()
    content:string
}
