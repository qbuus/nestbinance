import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BinanceApiService } from './binance-api.service';

@Controller('binance')
export class BinanceApiController {
  constructor(private readonly binanceApiService: BinanceApiService) {}

  @Get('analyze')
  async Historical(
    @Res() res: Response,
    @Query('interval') interval: string,
    @Query('startTime') startTime?: string,
    @Query('endTime') endTime?: string,
  ) {
    if (!interval) {
      throw new BadRequestException('Query param: Interval is required');
    }

    const rawResponse = await this.binanceApiService.getHistoricalData({
      interval,
      startTime,
      endTime,
    });

    if (rawResponse.length === 0 || !rawResponse)
      return 'No data for the given period of time';

    const analyzedData =
      this.binanceApiService.analyzeHistoricalData(rawResponse);

    const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Historical Data</title>
          </head>
          <body>
            <h1>Historical Data</h1>
            <table>
               <tr><th>Start Time</th><td>${new Date(analyzedData.timestampStart).toLocaleString()}</td></tr>
              <tr><th>End Time</th><td>${new Date(analyzedData.timestampEnd).toLocaleString()}</td></tr>
              <tr><th>Total High</th><td>${analyzedData.totalHigh.toFixed(2)}</td></tr>
              <tr><th>Total Low</th><td>${analyzedData.totalLow.toFixed(2)}</td></tr>
              <tr><th>Total Volume</th><td>${analyzedData.totalVolume.toFixed(2)}</td></tr>
            </table>
          </body>
        </html>
      `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  }
}
