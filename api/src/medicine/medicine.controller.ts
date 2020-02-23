import { Controller, Post, Body, Get, Param, Query, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MedicineService } from './medicine.service';
import { MedicineCreateDto } from './dto/medicine-create.dto';
import { MedicineUpdateDto } from './dto/medicine-update.dto';

@Controller('medicine')
export class MedicineController {
  route: string;
  constructor(
    private readonly medicineService: MedicineService,
    private readonly config: ConfigService,
  ) {
    this.route = config.get('app.apiUrl') + '/medicine';
  }

  @Post()
  async store(@Body() medicine: MedicineCreateDto) {
    return await this.medicineService.store(medicine);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() medicine: MedicineUpdateDto) {
    return await this.medicineService.updateMedicine(id, medicine);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.medicineService.getById(id);
  }

  @Get()
  async getAll(@Query() query: { page: string; limit: string }) {
    return await this.medicineService.getAll(
      this.route,
      query.page,
      query.limit,
    );
  }
}
