import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DrugService } from './drug.service';
import { DrugCreateDto } from './dto/drug-create.dto';

@Controller('drug')
export class DrugController {
  route: string;
  constructor(private readonly drugService: DrugService, private readonly config: ConfigService) {
    this.route = config.get('app.apiUrl') + '/drug';
  }

  @Post()
  async login(@Body() req: DrugCreateDto) {
    return await this.drugService.storeDrug(req);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.drugService.findById(id);
  }

  @Get()
  async getAll(@Query() query: {page?: string, limit?: string}) {
    return await this.drugService.getAll(this.route, query.page, query.limit);
  }
}
