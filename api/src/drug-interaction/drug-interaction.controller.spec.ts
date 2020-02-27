import { Test, TestingModule } from '@nestjs/testing';
import { DrugInteractionController } from './drug-interaction.controller';

describe('DrugInteraction Controller', () => {
  let controller: DrugInteractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugInteractionController],
    }).compile();

    controller = module.get<DrugInteractionController>(DrugInteractionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
