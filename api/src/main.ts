import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*', methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'] },
  });
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      // const logger = appContext.get(Logger);
      const seeder = appContext.get(SeederService);
      seeder
        .seed()
        .then(() => {
          console.log('Seeding complete!');
        })
        .catch(error => {
          console.log('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
  await app.listen(3123);
}
bootstrap();
