import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  Repository,
  FindManyOptions,
  ObjectID,
  FindConditions,
  DeleteResult,
} from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

export class GenericService<T, CreateInput, UpdateInput> {
  private model: Repository<T>;
  constructor(model: Repository<T>) {
    this.model = model;
  }

  protected async fetchAll(
    options: IPaginationOptions,
    searchOptions?: FindConditions<T> | FindManyOptions<T>
  ): Promise<Pagination<T>> {
    return paginate<T>(this.model, options, searchOptions);
  }

  protected async fetchBy(fetchField: FindManyOptions<T>): Promise<T[]> {
    try {
      const fetch = await this.model.find(fetchField);
      if (fetch) {
        return fetch;
      } else {
        throw new NotFoundException(
          `The resource ${Object.values(fetchField)} not found.`,
          'Not found.',
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async create(data: CreateInput[]): Promise<(CreateInput & T)[]> {
    try {
      return await this.model.save(data);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async update(
    updatedData: UpdateInput[],
  ): Promise<T[]> {
    try {
      return await this.model.save(updatedData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  protected async delete(
    field:
      | string
      | number
      | string[]
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>,
  ): Promise<DeleteResult> {
    try {
      return await this.model.delete(field);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
