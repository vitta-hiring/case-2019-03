import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrugInteractionService } from './drug-interaction.service';
import { DrugInteractionController } from './drug-interaction.controller';
import { DrugInteraction } from './drug-interaction.entity';
import { DrugModule } from '../drug/drug.module';

@Module({
  imports: [TypeOrmModule.forFeature([DrugInteraction]), DrugModule],
  providers: [DrugInteractionService],
  controllers: [DrugInteractionController],
  exports: [TypeOrmModule, DrugInteractionService]
})
export class DrugInteractionModule {}
