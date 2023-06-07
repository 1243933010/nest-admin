import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoopTaskService } from './loop-task.service';
import { CreateLoopTaskDto } from './dto/create-loop-task.dto';
import { UpdateLoopTaskDto } from './dto/update-loop-task.dto';

@Controller('loopTask')
export class LoopTaskController {
  constructor(private readonly loopTaskService: LoopTaskService) {}

  @Post()
  create(@Body() createLoopTaskDto: CreateLoopTaskDto) {
    return this.loopTaskService.create(createLoopTaskDto);
  }

  @Get()
  findAll() {
    return this.loopTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loopTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoopTaskDto: UpdateLoopTaskDto) {
    return this.loopTaskService.update(+id, updateLoopTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loopTaskService.remove(+id);
  }
}
