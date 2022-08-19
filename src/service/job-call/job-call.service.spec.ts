import { Test, TestingModule } from '@nestjs/testing';
import { JobCallService } from './job-call.service';

describe('JobCallService', () => {
  let service: JobCallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobCallService],
    }).compile();

    service = module.get<JobCallService>(JobCallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
