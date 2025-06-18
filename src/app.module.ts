import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceApiModule } from './binance-api/binance-api.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BinanceApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
