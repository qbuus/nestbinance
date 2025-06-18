import { Module } from '@nestjs/common';
import { BinanceApiService } from './binance-api.service';
import { HttpModule } from '@nestjs/axios';
import { BinanceApiController } from './binance-api.controller';

@Module({
  imports: [HttpModule],
  providers: [BinanceApiService],
  exports: [BinanceApiService],
  controllers: [BinanceApiController],
})
export class BinanceApiModule {}
