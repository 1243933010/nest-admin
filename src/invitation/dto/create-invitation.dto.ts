import {IsNotEmpty,IsString,IsArray,IsNumber} from 'class-validator'
export class CreateInvitationDto {
    
    @IsNumber()
    userId:number

    @IsString()
    title:string

    @IsString()
    content:string
}
