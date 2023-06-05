import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Query,Request } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { CommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';
import {CreateInvitationPipe} from './pipe/pipe.pipe'

@Controller({
  path:'invitation',
  version:'1'
})
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  create(@Body(CreateInvitationPipe) createInvitationDto: CreateInvitationDto) {
    return this.invitationService.create(createInvitationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Query() Query) {
    return this.invitationService.findAll(Query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationService.findOne(+id);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitationDto: UpdateInvitationDto,@Request() req) {
    console.log(id,updateInvitationDto,req.user)
    return this.invitationService.update(+id, updateInvitationDto,req);
  }

 @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string,@Request() req) {
    
    return this.invitationService.remove(+id,req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('comment')
  comment(@Body() body:CommentDto,@Request() req){
    return this.invitationService.addComment(body,req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('comment/:id')
  getComment(@Param() param:{id:string}){
    return this.invitationService.getComment(+param.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('reply/:id')
  getReply(@Param() param:{id:string}){
    return this.invitationService.getReply(+param.id);
  }
  
}
