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
    return await this.userService.storeUser(user);
  }

  async login(user: LoginDTO): Promise<IToken> {
    const data = await this.userService.findBy({ email: user.email }, true);
    if (data) {
      if (await bcrypt.compare(user.password, data.password)) {
        const payload = {
          id: data.id,
          userEmail: data.email,
        };

        const token = this.jwtService.sign(payload);
        return {
          userId: data.id,
          token,
          userEmail: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        };
      }
    }

    throw new HttpException(
      { ...CUSTOM_HTTP_ERRORS.UNAUTHORIZED },
      HttpStatus.BAD_REQUEST,
    );
  }

  async recoverPassword(email: string) {
    const data = await this.userService.findBy({ email });
    if (data) {
      const token = Math.floor(100000 + Math.random() * 900000);
      data.recoveryPassToken = token;
      data.recoveryPassExpirationDate = add(Date.now(), { hours: 2 }).toString();
      return await this.userService.updateUser({ id: data.id }, data);

    }
    
  }
}
