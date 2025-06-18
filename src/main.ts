import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      json: true,
      prefix: 'Binance API',
    }),
  });
  const configService = app.get(ConfigService);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(configService.get<number>('PORT') ?? 3000);
}
bootstrap();
