import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';
import { getConnectionManager } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*', methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'] },
  });
  const seeder = app.get(SeederService);
  seeder
    .seed()
    .then(() => {
      console.log('Seeding complete!');
    })
    .catch(err => {
      // If AlreadyHasActiveConnectionError occurs, return already existent connection
      if (err.name === 'AlreadyHasActiveConnectionError') {
        const existentConn = getConnectionManager().get('default');
        return existentConn;
      }
    });
  await app.listen(3123);
}
bootstrap();
