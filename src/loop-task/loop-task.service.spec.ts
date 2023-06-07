import { Test, TestingModule } from '@nestjs/testing';
import { LoopTaskService } from './loop-task.service';

describe('LoopTaskService', () => {
  let service: LoopTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoopTaskService],
    }).compile();

    service = module.get<LoopTaskService>(LoopTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
