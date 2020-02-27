import { Module } from '@nestjs/common';
import { DrugModule } from '../drug/drug.module';
import { DrugInteractionModule } from '../drug-interaction/drug-interaction.module';
import { MedicineModule } from '../medicine/medicine.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [DrugModule, DrugInteractionModule, MedicineModule],
  providers: [SeederService]
})
export class SeederModule {}
