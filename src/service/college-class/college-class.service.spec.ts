import { Test, TestingModule } from '@nestjs/testing';
import { CollegeClassService } from './college-class.service';

describe('CollegeClassService', () => {
  let service: CollegeClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollegeClassService],
    }).compile();

    service = module.get<CollegeClassService>(CollegeClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
