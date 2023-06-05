import {IsNotEmpty,IsString,IsArray,IsNumber} from 'class-validator'
export class CommentDto {
    
    @IsNumber()
    invitationId:number

    @IsNotEmpty()
    @IsString()
    context:string

    @IsString()
    parentId:number

    @IsNumber()
    commnetNum:number
}
