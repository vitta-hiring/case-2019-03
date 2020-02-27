import { Controller, Post, Body, Put, Param, Get, Query, UseGuards, Delete } from '@nestjs/common';

import { PrescriptionService } from './prescription.service';
import { PrescriptionCreateDto } from './dto/prescription-create.dto';
import { PrescriptionUpdateDto } from './dto/prescription-update.dto';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('prescription')
export class PrescriptionController {
  route: string;
  constructor(
    private readonly prescriptionService: PrescriptionService,
    private readonly config: ConfigService,
  ) {
    this.route = config.get('app.apiUrl') + '/prescription';
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() prescription: PrescriptionCreateDto) {
    return await this.prescriptionService.store(prescription);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() prescription: PrescriptionUpdateDto,
  ) {
    return await this.prescriptionService.updatePrescription(id, prescription);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(
    @Query()
    query: {
      page: string;
      limit: string;
      search: { searchedColumn: string; searchText: string };
    },
  ) {
    return await this.prescriptionService.getAll(
      this.route,
      query.page,
      query.limit,
      query.search
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.prescriptionService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.prescriptionService.deletePrescription(id);
  }
}
