import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // constructor(private readonly reflector: Reflector) {
  //   super()
  // }

  // getRequest(context: ExecutionContext) {
  //   const roles = this.reflector.get<string[]>('roles', context.getHandler());
  //   if (!roles) {
  //     return true;
  //   }
  //   const request = context.switchToHttp().getRequest();
  //   const user = request.user;
  //   const hasRole = () => user.roles.some(role => roles.includes(role));
  //   return user && user.roles && hasRole();
  // }
}
