import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DrugService } from './drug.service';
import { DrugController } from './drug.controller';
import { Drug } from './drug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drug])],
  providers: [DrugService],
  controllers: [DrugController],
  exports: [TypeOrmModule, DrugService]
})
export class DrugModule {}
