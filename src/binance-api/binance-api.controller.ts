import { Controller, Get, Query } from '@nestjs/common';
import { BinanceApiService } from './binance-api.service';

@Controller('binance')
export class BinanceApiController {
  constructor(private readonly binanceApiService: BinanceApiService) {}

  @Get('analyze')
  async Historical(
    @Query('interval') interval: string,
    @Query('startTime') startTime?: string,
    @Query('endTime') endTime?: string,
  ) {
    const rawResponse = await this.binanceApiService.getHistoricalData({
      interval,
      startTime,
      endTime,
    });

    if (rawResponse.length === 0 || !rawResponse)
      return 'No data for the given period of time';

    const analyzedData =
      this.binanceApiService.analyzeHistoricalData(rawResponse);

    return analyzedData;
  }
}
