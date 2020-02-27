import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { CUSTOM_HTTP_ERRORS } from '../../utils/exception-filters/custom-http-errors.filter';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.INVALID_CREDENTIALS },
        HttpStatus.UNAUTHORIZED,
        );
      }
    return user;
  }
}
