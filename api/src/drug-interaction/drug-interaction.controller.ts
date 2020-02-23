import { Controller, Post, Get, Param, Query, Body } from '@nestjs/common';
import { DrugInteractionService } from './drug-interaction.service';
import { DrugInteractionCreateDto } from './dto/drug-interaction-create.dto';
import { ConfigService } from '@nestjs/config';


@Controller('druginteraction')
export class DrugInteractionController {
  route: string;
  constructor(private readonly drugInteractionService: DrugInteractionService, private readonly config: ConfigService){
    this.route = config.get('app.apiUrl') + '/druginteraction'
  }

  @Post()
  async storeDrugInteraction(@Body() drugInteraction: DrugInteractionCreateDto) {
    return await this.drugInteractionService.store(drugInteraction);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.drugInteractionService.getById(id);
  }

  @Get()
  async getAll(@Query() query: {page: string, limit: string}) {
    return await this.drugInteractionService.getAll(this.route, query.page, query.limit);
  }
}
