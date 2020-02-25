import { Test, TestingModule } from '@nestjs/testing';
import { DrugInteractionService } from './drug-interaction.service';

describe('DrugInteractionService', () => {
  let service: DrugInteractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrugInteractionService],
    }).compile();

    service = module.get<DrugInteractionService>(DrugInteractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
