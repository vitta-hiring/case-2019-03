import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';

import { GenericService } from '../utils/generics/service.generic';
import { Drug } from './drug.entity';
import { DrugCreateDto } from './dto/drug-create.dto';
import { DrugUpdateDto } from './dto/drug-update.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';

@Injectable()
export class DrugService extends GenericService<
  Drug,
  DrugCreateDto,
  DrugUpdateDto
> {
  constructor(@InjectRepository(Drug) drugRepository: Repository<Drug>) {
    super(drugRepository);
  }

  async drugExists(id: string): Promise<boolean> {
    const drug = await this.fetchBy({ where: { id } });
    if (drug) {
      return true;
    }

    return false;
  }

  async storeDrug(drug: DrugCreateDto) {
    return await this.create(drug);
  }

  async deleteDrug(id: string | number | number[]) {
    if (this.drugExists(String(id))) {
      return await this.delete({ id: Number(id) });
    }
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  async findById(
    id: string | number | number[],
    withPassword: boolean = false,
  ) {
    const drug = await this.fetchBy({ where: { id } });
    if (drug) return drug;
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  async findBy(field: FindManyOptions<Drug>, withPassword: boolean = false) {
    const drug = await this.fetchBy(field);
    if (drug) return drug;
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  async getAll(
    route: string,
    currentPage: string | number = 1,
    perPage: string | number = 10,
    id: string = '',
    nome: string = ''
  ) {
    if(id == 'undefined') id = '';
    if(nome == 'undefined') nome = '';
    return await this.fetchAll(
      {
        limit: Number(perPage),
        page: Number(currentPage),
        route,
      },
      {
        where: { nome: Like(`%${nome}%`), id: Like(`%${id}%`) },
        order: { nome: 'ASC' },
      },
    );
  }
  Ï;
}
