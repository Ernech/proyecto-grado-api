import { Test, TestingModule } from '@nestjs/testing';
import { JobApplyService } from './job-apply.service';

describe('JobApplyService', () => {
  let service: JobApplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobApplyService],
    }).compile();

    service = module.get<JobApplyService>(JobApplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
