import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GenericService } from '../utils/generics/service.generic';
import { DrugInteraction } from './drug-interaction.entity';
import { DrugInteractionCreateDto } from './dto/drug-interaction-create.dto';
import { DrugInteractionUpdateDto } from './dto/drug-interaction-update.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';

@Injectable()
export class DrugInteractionService extends GenericService<DrugInteraction, DrugInteractionCreateDto, DrugInteractionUpdateDto> {
  constructor(@InjectRepository(DrugInteraction) drugInteractionRepository: Repository<DrugInteraction>){
    super(drugInteractionRepository);
  }

  async store(drugInteraction: DrugInteractionCreateDto) {
    return await this.create(drugInteraction);
  }

  async getById(id: string) {
    const data = await this.fetchBy({where: { id }});
    if(data) return data;
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  async getAll(route: string, currentPage: string | number = 1, perPage: string | number = 10) {
    return await this.fetchAll(
      {
        limit: Number(perPage),
        page: Number(currentPage),
        route
      }
    );
  }Ï
}
