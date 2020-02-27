import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { Medicine } from './medicine.entity';
import { DrugModule } from '../drug/drug.module';
import { DrugInteractionModule } from '../drug-interaction/drug-interaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine]), DrugModule, DrugInteractionModule],
  providers: [MedicineService],
  controllers: [MedicineController],
  exports: [TypeOrmModule, MedicineService]
})
export class MedicineModule {}
