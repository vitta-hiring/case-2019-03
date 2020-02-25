import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/user-create.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  // @Post('')
  // async login(@Body() req: LoginDTO) {
  //   return this.authService.login(req);
  // }

  @UseGuards(AuthGuard('local'))
  @Post('')
  async login(@Request() req) {
    console.log("CONTROLLER: ", req.user)
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: UserCreateDto) {
    return await this.authService.register(user);
  }

  
}
