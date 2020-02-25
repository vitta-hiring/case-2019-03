import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindManyOptions, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { GenericService } from '../utils/generics/service.generic';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';

@Injectable()
export class UserService extends GenericService<
  User,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {
    super(userModel);
  }

  async userExists(email: string): Promise<boolean> {
    const user = (await this.findBy({ where: { email } }))[0];
    if (user) {
      return true;
    }

    return false;
  }

  async storeUser(user: UserCreateDto, withPassword = false): Promise<User[]> {
    const userExist = await this.userExists(user.email);
    if (!userExist) {
      user.password = await bcrypt.hash(user.password, 12);
      const userCreated = await this.create([user]);
      if (!withPassword) userCreated[0].password = undefined;
      userCreated[0].emailToken = undefined;
      return userCreated;
    }

    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.USER_REGISTERED },
      HttpStatus.BAD_REQUEST,
    );
  }

  async updateUser(user: UserUpdateDto, withPassword = false) {
    const userUpdated: any = await this.update([user]);
    userUpdated.emailToken = undefined;
    if (!withPassword) userUpdated.password = undefined;
    return userUpdated;
  }

  async findBy(field: FindManyOptions<User>, withPassword = false) {
    const users = await this.fetchBy(withPassword ? { select: ['password', 'id', 'firstName', 'lastName', 'email'], ...field}  : field);
    if (users) {
      // if (!withPassword) users.map(user => (user.password = undefined));
      return users;
    }
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
        route,
        page: Number(currentPage),
        limit: Number(perPage),
      },
      {
        relations: ['prescriptions'],
        where: { [search.searchedColumn]: Like(`%${search.searchText}%`) },
        order: { [search.searchedColumn]: 'ASC' },
      },
    );
  }
}
