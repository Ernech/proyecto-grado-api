import { Test, TestingModule } from '@nestjs/testing';
import { CvEvaluationService } from './cv-evaluation.service';

describe('CvEvaluationService', () => {
  let service: CvEvaluationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvEvaluationService],
    }).compile();

    service = module.get<CvEvaluationService>(CvEvaluationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
