import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path';

import { DrugModule } from '../drug/drug.module';
import { DrugInteractionModule } from '../drug-interaction/drug-interaction.module';
import { MedicineModule } from '../medicine/medicine.module';
import { SeederService } from './seeder.service';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import authConfig from '../config/auth.config';
import localDatabase from '../config/local-database';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${path.resolve(
        'environments',
        // `.${process.env.NODE_ENV || 'dev'}.env`,
        `.env`,
      )}`,
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, localDatabase],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await configService.get('localDatabase'),
      inject: [ConfigService],
    }),
    DrugModule,
    DrugInteractionModule,
    MedicineModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
