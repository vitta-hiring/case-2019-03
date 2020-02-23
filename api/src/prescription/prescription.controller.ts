import { Controller, Post, Body, Put, Param, Get, Query } from '@nestjs/common';

import { PrescriptionService } from './prescription.service';
import { PrescriptionCreateDto } from './dto/prescription-create.dto';
import { PrescriptionUpdateDto } from './dto/prescription-update.dto';
import { ConfigService } from '@nestjs/config';

@Controller('prescription')
export class PrescriptionController {
  route: string;
  constructor(private readonly prescriptionService: PrescriptionService, private readonly config: ConfigService){
    this.route = config.get('app.apiUrl') + '/prescription';
  }

  @Post()
  async store(@Body() prescription: PrescriptionCreateDto) {
    return await this.prescriptionService.store(prescription);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() prescription: PrescriptionUpdateDto) {
    return await this.prescriptionService.updatePrescription(id, prescription);
  }

  @Get()
  async getAll(@Query() query: { page: string, limit: string}) {
    return await this.prescriptionService.getAll(this.route, query.page, query.limit);
  }

  @Get('id')
  async getById(@Param('id') id: string) {
    return await this.prescriptionService.getById(id);
  }
}
