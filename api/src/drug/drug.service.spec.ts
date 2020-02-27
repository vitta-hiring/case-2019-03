import { Test, TestingModule } from '@nestjs/testing';
import { DrugService } from './drug.service';

describe('DrugService', () => {
  let service: DrugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrugService],
    }).compile();

    service = module.get<DrugService>(DrugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
