import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { GenericService } from '../utils/generics/service.generic';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';

@Injectable()
export class UserService extends GenericService<User, UserCreateDto, UserUpdateDto>{
  constructor( @InjectRepository(User) private readonly userModel: Repository<User>){
    super(userModel);
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.findBy({ email });
    if (user) {
      return true;
    }

    return false;
  }

  async storeUser(user: UserCreateDto): Promise<User> {
    if(await this.userExists(user.email)) {
      user.password = await bcrypt.hash(user.password, 12);
      const userCreated: any = await this.create(
        user,
      );
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

  async updateUser(
    field: FindConditions<User>,
    user: UserUpdateDto,
  ) {
    const userUpdated: any = await this.update(
      field,
      user,
    );
    userUpdated.emailToken = undefined;
    userUpdated.password = undefined;
    return userUpdated;
  }

  async findBy(
    field: { email: string },
    withPassword: boolean = false,
  ) {
    return await this.userModel.findOne(
      field,
    );
  }

  async getAll(currentPage: string, perPage: string) {
    return await this.fetchAll(
      currentPage,
      perPage,
    );
  }
}
