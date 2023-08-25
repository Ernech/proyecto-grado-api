import { Test, TestingModule } from '@nestjs/testing';
import { JobApplyController } from './job-apply.controller';

describe('JobApplyController', () => {
  let controller: JobApplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobApplyController],
    }).compile();

    controller = module.get<JobApplyController>(JobApplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
