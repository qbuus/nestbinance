import { Controller, Get, Query } from '@nestjs/common';
import { BinanceApiService } from './binance-api.service';

@Controller('binance')
export class BinanceApiController {
  constructor(private readonly binanceApiService: BinanceApiService) {}

  @Get('historical')
  async Historical(
    @Query('interval') interval?: string,
    @Query('startTime') startTime?: string,
    @Query('endTime') endTime?: string,
  ) {
    const response = this.binanceApiService.getHistoricalData({
      interval,
      startTime,
      endTime,
    });

    await response;
  }
}
