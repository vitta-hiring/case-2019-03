import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { add } from 'date-fns';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { CUSTOM_HTTP_ERRORS } from '../utils/exception-filters/custom-http-errors.filter';
import { LoginDTO } from './dto/login.dto';
import { IToken } from './auth.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: UserCreateDto): Promise<User> {
    return (await this.userService.storeUser(user))[0];
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = (await this.userService.findBy({ where: { email } }, true))[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  login(user: User): IToken {
    const payload = {
      id: user.id,
      userEmail: user.email,
    };


    const token = this.jwtService.sign(payload);
    return {
      userId: user.id,
      token,
      userEmail: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async recoverPassword(email: string) {
    const data = await this.userService.findBy({ where: { email } })[0];
    if (data) {
      const token = Math.floor(100000 + Math.random() * 900000);
      data.recoveryPassToken = token;
      data.recoveryPassExpirationDate = add(Date.now(), {
        hours: 2,
      }).toString();
      return await this.userService.updateUser(data);
    }

    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.NOT_FOUND },
      HttpStatus.NOT_FOUND,
    );
  }
}
