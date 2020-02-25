import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DrugInteractionService } from './drug-interaction.service';
import { DrugInteractionCreateDto } from './dto/drug-interaction-create.dto';
import { DrugInteractionUpdateDto } from './dto/drug-interaction-update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('druginteraction')
export class DrugInteractionController {
  route: string;
  constructor(
    private readonly drugInteractionService: DrugInteractionService,
    private readonly config: ConfigService,
  ) {
    this.route = config.get('app.apiUrl') + '/druginteraction';
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async storeDrugInteraction(
    @Body() drugInteraction: DrugInteractionCreateDto,
  ) {
    return await this.drugInteractionService.store(drugInteraction);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateDrugInteraction(
    @Param('id') id: string,
    @Body() drugInteraction: DrugInteractionUpdateDto,
  ) {
    return await this.drugInteractionService.updatedDrugInteraction(
      id,
      drugInteraction,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.drugInteractionService.getById(id);
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
    return await this.drugInteractionService.getAll(
      this.route,
      query.page,
      query.limit,
      query.search,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.drugInteractionService.deleteDrugIteraction(id);
  }
}
