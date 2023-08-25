import { Test, TestingModule } from '@nestjs/testing';
import { JobCallController } from './job-call.controller';

describe('JobCallController', () => {
  let controller: JobCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobCallController],
    }).compile();

    controller = module.get<JobCallController>(JobCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
