import { Test, TestingModule } from '@nestjs/testing';
import { CareerClassController } from './college-class.controller';

describe('CareerClassController', () => {
  let controller: CareerClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerClassController],
    }).compile();

    controller = module.get<CareerClassController>(CareerClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
