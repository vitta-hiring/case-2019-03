import { Controller, Post, Body, Get, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DrugService } from './drug.service';
import { DrugCreateDto } from './dto/drug-create.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('drug')
export class DrugController {
  route: string;
  constructor(private readonly drugService: DrugService, private readonly config: ConfigService) {
    this.route = config.get('app.apiUrl') + '/drug';
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async store(@Body() req: DrugCreateDto) {
    return await this.drugService.storeDrug(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.drugService.findById(id);
  }


  @Get()
  async getAll(@Query() query: {page?: string, limit?: string, search: { searchedColumn: string, searchText: string }}) {
    return await this.drugService.getAll(this.route, query.page, query.limit, query.search);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.drugService.deleteDrug(id);
  }
}
