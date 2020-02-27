import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';

import { GenericService } from '../utils/generics/service.generic';
import { Prescription } from './prescription.entity';
import { PrescriptionCreateDto } from './dto/prescription-create.dto';
import { PrescriptionUpdateDto } from './dto/prescription-update.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';
import { Medicine } from '../medicine/medicine.entity';
import { MedicineService } from '../medicine/medicine.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PrescriptionService extends GenericService<
  Prescription,
  PrescriptionCreateDto,
  PrescriptionUpdateDto
> {
  constructor(
    @InjectRepository(Prescription)
    prescriptionRepository: Repository<Prescription>,
    private readonly medicineService: MedicineService,
    private readonly userService: UserService,
  ) {
    super(prescriptionRepository);
  }

  async prescriptionExists(id: string): Promise<boolean> {
    const prescription = await this.fetchBy({ where: { id } });
    if (prescription) {
      return true;
    }

    return false;
  }

  async store(prescription: PrescriptionCreateDto) {
    prescription = await this.verifyRelations(prescription);
    return (await this.create([prescription]))[0];
  }

  async updatePrescription(id: string, prescription: PrescriptionUpdateDto) {
    if (await this.prescriptionExists(id)) {
      prescription = await this.verifyRelations(prescription);
      prescription.id = Number(id);
      return (await this.update([prescription]))[0];
    }
  }

  private async verifyRelations(prescription) {
    if (prescription.medicines) {
      if (typeof prescription.medicines === 'object') {
        if (prescription.medicines.length > 0) {
          const ids = [];
          prescription.medicines.map(id => ids.push({ id }));
          const medicines = await this.medicineService.findBy({
            where: ids,
          });
          ((prescription as unknown) as {
            medicines: Medicine[];
          }).medicines = medicines;
        }
      } else {
        throw new HttpException(
          { ...CUSTOM_HTTP_ERRORS.OBJECT_INVALID },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (prescription.patient) {
      if (typeof prescription.patient === 'number') {
        if (prescription.patient > 0) {
          const patient = await this.userService.findBy({
            where: { id: prescription.patient },
          });
          ((prescription as unknown) as {
            patient: User;
          }).patient = patient[0];
        }
      } else {
        throw new HttpException(
          { ...CUSTOM_HTTP_ERRORS.OBJECT_INVALID },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return prescription;
  }

  async findBy(field: FindManyOptions<Prescription>) {
    const prescription = await this.fetchBy(field);
    if (prescription) return prescription;
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: string | number | number[]) {
    const prescription = await this.fetchBy({
      where: { id },
      relations: ['patient'],
    });
    prescription[0].patient.password = undefined;
    return prescription;
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
        relations: ['patient'],
        where: { [search.searchedColumn]: Like(`%${search.searchText}%`) },
        order: { [search.searchedColumn]: 'ASC' },
      },
    );
  }

  async deletePrescription(id: string | number | number[]) {
    if (this.prescriptionExists(String(id))) {
      return await this.delete({ id: Number(id) });
    }
    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }
}
