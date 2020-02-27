import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DrugModule } from './drug/drug.module';
import { DrugInteractionModule } from './drug-interaction/drug-interaction.module';
import { MedicineModule } from './medicine/medicine.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { SeederModule } from './seeder/seeder.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${path.resolve(
        'environments',
        // `.${process.env.NODE_ENV || 'dev'}.env`,
        `.env`,
      )}`,
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await configService.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    DrugModule,
    DrugInteractionModule,
    MedicineModule,
    PrescriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
