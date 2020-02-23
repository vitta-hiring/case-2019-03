import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrugInteractionService } from './drug-interaction.service';
import { DrugInteractionController } from './drug-interaction.controller';
import { DrugInteraction } from './drug-interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrugInteraction])],
  providers: [DrugInteractionService],
  controllers: [DrugInteractionController],
  exports: [TypeOrmModule]
})
export class DrugInteractionModule {}
