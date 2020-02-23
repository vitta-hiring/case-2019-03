import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindManyOptions } from 'typeorm';
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
    const user = await this.findBy({ where: { email } });
    if (user) {
      return true;
    }

    return false;
  }

  async storeUser(user: UserCreateDto): Promise<User> {
    if (!(await this.userExists(user.email))) {
      user.password = await bcrypt.hash(user.password, 12);
      const userCreated: any = await this.create(user);
      if (userCreated.password || userCreated.emailToken) {
        userCreated.password = undefined;
        userCreated.emailToken = undefined;
      }
      return userCreated;
    }

    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.USER_REGISTERED },
      HttpStatus.BAD_REQUEST,
    );
  }

  async updateUser(user: User) {
    const userUpdated: any = await this.update(user);
    userUpdated.emailToken = undefined;
    userUpdated.password = undefined;
    return userUpdated;
  }

  async findBy(field: FindManyOptions<User>) {
    const users = await this.fetchBy(field);
    if (users) {
      users.map(user => user.password = undefined);
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
  ) {
    return await this.fetchAll({
      limit: Number(perPage),
      page: Number(currentPage),
      route,
    });
  }
}
