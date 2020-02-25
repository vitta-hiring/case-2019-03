import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { GenericService } from '../utils/generics/service.generic';
import { DrugInteraction } from './drug-interaction.entity';
import { DrugInteractionCreateDto } from './dto/drug-interaction-create.dto';
import { DrugInteractionUpdateDto } from './dto/drug-interaction-update.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';
import { DrugService } from '../drug/drug.service';
import { Drug } from 'src/drug/drug.entity';

@Injectable()
export class DrugInteractionService extends GenericService<
  DrugInteraction,
  DrugInteractionCreateDto,
  DrugInteractionUpdateDto
> {
  constructor(
    @InjectRepository(DrugInteraction)
    drugInteractionRepository: Repository<DrugInteraction>,
    private readonly drugService: DrugService,
  ) {
    super(drugInteractionRepository);
  }

  async drugInteractionExists(id: string): Promise<boolean> {
    const drugInteraction = await this.fetchBy({ where: { id } });
    if (drugInteraction) {
      return true;
    }

    return false;
  }

  async store(drugInteraction: DrugInteractionCreateDto) {
    const entities = await this.verifyRelations(drugInteraction);
    return (await this.create(entities))[0];
  }

  async updatedDrugInteraction(
    id: string,
    drugInteraction: DrugInteractionUpdateDto,
  ) {
    if (this.drugInteractionExists(id)) {
      const entities = await this.verifyRelations(drugInteraction);
      return (await this.update(entities))[0];
    }
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  private async verifyRelations(
    drugInteraction: DrugInteractionUpdateDto | DrugInteractionCreateDto,
  ): Promise<DrugInteractionCreateDto[] | DrugInteractionUpdateDto[]> {
    if (drugInteraction.farmaco1 && drugInteraction.farmaco2) {
      if (
        typeof drugInteraction.farmaco1 === 'number' &&
        typeof drugInteraction.farmaco2 === 'object'
      ) {
        const farmaco1 = await this.drugService.findBy({
          where: { id: drugInteraction.farmaco1 },
        });
        if (drugInteraction.farmaco2.length > 0 && farmaco1.length === 1) {
          const ids = [];
          const entities: {
            nome?: string;
            descricao?: string;
            farmaco1: Drug;
            farmaco2: Drug;
          }[] = [];
          drugInteraction.farmaco2.map(id => {
            if (id !== drugInteraction.farmaco1) ids.push({ id });
          });
          const farmacos2 = await this.drugService.findBy({
            where: ids,
          });
          farmacos2.map(farmaco2 => {
            if (farmaco1[0].id !== farmaco2.id) {
              entities.push({
                nome: drugInteraction.nome ? drugInteraction.nome : undefined,
                descricao: drugInteraction.descricao
                  ? drugInteraction.descricao
                  : undefined,
                farmaco1: farmaco1[0],
                farmaco2,
              });
            }
          });
          const farmacosIds: { farmaco1Id: number; farmaco2Id: number }[] = [];
          entities.map(entity => {
            farmacosIds.push({
              farmaco1Id: entity.farmaco1.id,
              farmaco2Id: entity.farmaco2.id,
            });
          });
          const interactions = await this.getInteraction(farmacosIds);
          const hasInteraction = interactions.find(
            int => int.hasDrugInteraction === true,
          );
          if (!hasInteraction) {
            return (entities as unknown) as
              | DrugInteractionCreateDto[]
              | DrugInteractionUpdateDto[];
          }
        }
      }
    }
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.OBJECT_INVALID },
      HttpStatus.BAD_REQUEST,
    );
  }

  async getById(id: string) {
    const data = await this.fetchBy({ where: { id } });
    if (data) return data;
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  async getAll(
    route: string,
    currentPage: string | number = 1,
    perPage: string | number = 10,
    search: { searchedColumn: string; searchText: string } = {
      searchText: '',
      searchedColumn: 'id',
    },
  ) {
    if (search.searchText == 'undefined') search.searchText = '';
    if (search.searchedColumn == 'undefined') search.searchedColumn = 'id';
    return await this.fetchAll(
      {
        limit: Number(perPage),
        page: Number(currentPage),
        route,
      },
      {
        where: { [search.searchedColumn]: Like(`%${search.searchText}%`) },
        order: { [search.searchedColumn]: 'ASC' },
      },
    );
  }

  async getInteraction(
    farmacoIds: { farmaco1Id: number; farmaco2Id: number }[],
  ): Promise<
    {
      farmaco: { farmaco1Id: number; farmaco2Id: number };
      interaction1?: DrugInteraction;
      interaction2?: DrugInteraction;
      hasDrugInteraction: boolean;
    }[]
  > {
    const interactions: {
      farmaco: { farmaco1Id: number; farmaco2Id: number };
      interaction1?: DrugInteraction;
      interaction2?: DrugInteraction;
      hasDrugInteraction: boolean;
    }[] = [];
    await Promise.all(
      farmacoIds.map(async farmaco => {
        const interaction1 = await this.fetchBy({
          where: {
            farmaco1: { id: farmaco.farmaco1Id },
            farmaco2: { id: farmaco.farmaco2Id },
          },
        });
        const interaction2 = await this.fetchBy({
          where: {
            farmaco1: { id: farmaco.farmaco2Id },
            farmaco2: { id: farmaco.farmaco1Id },
          },
        });
        if (interaction1.length >= 1 || interaction2.length >= 1) {
          interactions.push({
            farmaco,
            interaction1: interaction1[0],
            interaction2: interaction2[0],
            hasDrugInteraction: true,
          });
        } else {
          interactions.push({
            farmaco,
            hasDrugInteraction: false,
          });
        }
      }),
    );
    return interactions;
  }

  async deleteDrugIteraction(id: string | number | number[]) {
    if (this.drugInteractionExists(String(id))) {
      return await this.delete({ id: Number(id) });
    }
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }
}
