import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import {
  AnalyzedData,
  BinanceApiParams,
  BinanceKline,
} from './interface/binance-api';
import { AxiosError } from 'axios';

@Injectable()
export class BinanceApiService {
  private readonly logger = new Logger(BinanceApiService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getHistoricalData(
    ApiParams: BinanceApiParams,
  ): Promise<BinanceKline[]> {
    const baseUrl = this.configService.getOrThrow<string>('BINANCE_API');

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<BinanceKline[]>(`${baseUrl}/api/v3/klines`, {
            params: {
              symbol: `${this.configService.getOrThrow<string>('SYMBOL')}`,
              limit: 200,
              ...ApiParams,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.message);
              throw new Error('An error happened!');
            }),
          ),
      );
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  analyzeHistoricalData(data: BinanceKline[]): AnalyzedData[] {
    const analyzedData: AnalyzedData[] = [];

    for (let index = 1; index < data.length; index++) {
      const current = data[index];
      const previous = data[index - 1];
      const currentPrice = parseFloat(current[4]);
      const previousPrice = parseFloat(previous[4]);

      const priceChange = currentPrice - previousPrice;
      const percentageChange = (priceChange / previousPrice) * 100;
      const directionOfChanges = priceChange > 0 ? 'UP' : 'DOWN';

      analyzedData.push({
        timestamp: current[0],
        priceChange: parseFloat(priceChange.toFixed(2)),
        percentageChange: parseFloat(percentageChange.toFixed(2)),
        directionOfChanges,
      });
    }

    return analyzedData;
  }
}
