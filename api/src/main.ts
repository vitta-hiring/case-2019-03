import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: { origin: '*', methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']}});
  await app.listen(3123);
}
bootstrap();
