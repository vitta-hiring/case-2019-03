import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MedicineService } from './medicine.service';
import { MedicineCreateDto } from './dto/medicine-create.dto';
import { MedicineUpdateDto } from './dto/medicine-update.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('medicine')
export class MedicineController {
  route: string;
  constructor(
    private readonly medicineService: MedicineService,
    private readonly config: ConfigService,
  ) {
    this.route = config.get('app.apiUrl') + '/medicine';
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() medicine: MedicineCreateDto) {
    return await this.medicineService.store(medicine);
  }

  @UseGuards(JwtAuthGuard)
  @Get('interactions')
  async getInteractions(@Query('ids') ids: number[]) {
    return this.medicineService.getMedicinesInteraction(ids);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() medicine: MedicineUpdateDto) {
    return await this.medicineService.updateMedicine(id, medicine);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.medicineService.deleteMedicine(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.medicineService.getById(id);
  }

  @Get()
  async getAll(
    @Query()
    query: {
      page: string;
      limit: string;
      search: { searchedColumn: string; searchText: string };
    },
  ) {
    return await this.medicineService.getAll(
      this.route,
      query.page,
      query.limit,
      query.search,
    );
  }

  
}
