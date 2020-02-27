import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'SAFE PRESCRIPTIONS API - VITTA TEST';
  }
}
