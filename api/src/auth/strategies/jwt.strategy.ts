import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { CUSTOM_HTTP_ERRORS } from '../../utils/exception-filters/custom-http-errors.filter';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secret'),
      ignoreExpiration: false,
      // passReqToCallback: true,
    });
  }

  async validate(payload) {
    console.log("JWT STRATEGY: ", payload)
    if (payload.userEmail) {
      return { userId: payload.id, userEmail: payload.userEmail };
    } else {
      throw new HttpException(
        { ...CUSTOM_HTTP_ERRORS.INVALID_CREDENTIALS },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}