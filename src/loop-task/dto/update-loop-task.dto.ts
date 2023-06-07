import { PartialType } from '@nestjs/mapped-types';
import { CreateLoopTaskDto } from './create-loop-task.dto';

export class UpdateLoopTaskDto extends PartialType(CreateLoopTaskDto) {}
