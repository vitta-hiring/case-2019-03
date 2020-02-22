import { Controller, Body, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('')
  async login(@Body() req: LoginDTO) {
    return this.authService.login(req);
  }

  @Post('register')
  async register(@Body() user: UserCreateDto) {
    return await this.authService.register(user);
  }

  
}
