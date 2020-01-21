import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from 'redis-adapter/redis-adapter-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.useStaticAssets(__dirname + '/../public');
  app.useStaticAssets(__dirname + '/../subidos');

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
