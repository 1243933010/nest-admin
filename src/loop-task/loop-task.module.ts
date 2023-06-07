import { Module } from '@nestjs/common';
import { LoopTaskService } from './loop-task.service';
import { LoopTaskController } from './loop-task.controller';

@Module({
  controllers: [LoopTaskController],
  providers: [LoopTaskService]
})
export class LoopTaskModule {}
