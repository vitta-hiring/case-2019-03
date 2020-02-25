import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { Prescription } from './prescription.entity';
import { UserModule } from '../user/user.module';
import { MedicineModule } from '../medicine/medicine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescription]),
    UserModule,
    MedicineModule,
  ],
  providers: [PrescriptionService],
  controllers: [PrescriptionController],
  exports: [TypeOrmModule]
})
export class PrescriptionModule {}
