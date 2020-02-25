import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';

import { GenericService } from '../utils/generics/service.generic';
import { Medicine } from './medicine.entity';
import { MedicineCreateDto } from './dto/medicine-create.dto';
import { MedicineUpdateDto } from './dto/medicine-update.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';
import { DrugService } from '../drug/drug.service';
import { Drug } from 'src/drug/drug.entity';

@Injectable()
export class MedicineService extends GenericService<
  Medicine,
  MedicineCreateDto,
  MedicineUpdateDto
> {
  constructor(
    @InjectRepository(Medicine) medicineRepository: Repository<Medicine>,
    private readonly drugService: DrugService,
  ) {
    super(medicineRepository);
  }

  async medicineExists(id: string): Promise<boolean> {
    const user = await this.fetchBy({ where: { id } });
    if (user) {
      return true;
    }

    return false;
  }

  async store(medicine: MedicineCreateDto) {
    if (medicine.farmacos) {
      if (typeof medicine.farmacos === 'object') {
        if (medicine.farmacos.length > 0) {
          const ids = [];
          medicine.farmacos.map(id => ids.push({ id }));
          const farmacos = await this.drugService.findBy({
            where: ids,
          });
          ((medicine as unknown) as { farmacos: Drug[] }).farmacos = farmacos;
        }
      } else {
        throw new HttpException(
          { ...CUSTOM_HTTP_ERRORS.OBJECT_INVALID },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return (await this.create([medicine]))[0];
  }

  async updateMedicine(id: string, medicine: MedicineUpdateDto) {
    if (await this.medicineExists(id)) {
      if (typeof medicine.farmacos === 'object') {
        if (medicine.farmacos.length > 0) {
          const ids = [];
          medicine.farmacos.map(id => ids.push({ id }));
          console.log('ids: ', ids);
          const farmacos = await this.drugService.findBy({
            where: ids,
          });
          console.log('farmacos: ', farmacos);
          ((medicine as unknown) as { farmacos: Drug[] }).farmacos = farmacos;
        }
      } else {
        throw new HttpException(
          { ...CUSTOM_HTTP_ERRORS.OBJECT_INVALID },
          HttpStatus.BAD_REQUEST,
        );
      }
      medicine.id = Number(id);
      return (await this.update([medicine]))[0];
    }

    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  async findBy(field: FindManyOptions<Medicine>) {
    const medicine = await this.fetchBy(field);
    if (medicine) return medicine;
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: string | number) {
    return await this.fetchBy({ where: { id }, relations: ['farmacos'] });
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
    if(search.searchText == 'undefined') search.searchText = '';
    if(search.searchedColumn == 'undefined') search.searchedColumn = 'id';
    return await this.fetchAll(
      {
        route,
        page: Number(currentPage),
        limit: Number(perPage),
      },
      {
        where: { [search.searchedColumn]: Like(`%${search.searchText}%`) },
        order: { [search.searchedColumn]: 'ASC' },
      },
    );
  }

  async deleteMedicine(id: string | number | number[]) {
    if (this.medicineExists(String(id))) {
      return await this.delete({ id: Number(id) });
    }
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }
}