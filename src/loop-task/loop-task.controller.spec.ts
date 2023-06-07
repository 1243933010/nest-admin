import { Test, TestingModule } from '@nestjs/testing';
import { LoopTaskController } from './loop-task.controller';
import { LoopTaskService } from './loop-task.service';

describe('LoopTaskController', () => {
  let controller: LoopTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoopTaskController],
      providers: [LoopTaskService],
    }).compile();

    controller = module.get<LoopTaskController>(LoopTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
