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

  analyzeHistoricalData(data: BinanceKline[]): AnalyzedData {
    if (data.length < 2) {
      throw new Error('Not enough data to analyze.');
    }

    const length = data.length;
    const timestampStart = data[0][0];
    const timestampEnd = data[length - 1][0];

    let totalHigh = 0;
    let totalLow = 0;
    let totalVolume = 0;

    data.forEach((d) => {
      totalHigh += parseFloat(d[2]);
      totalLow += parseFloat(d[3]);
      totalVolume += parseFloat(d[5]);
    });

    return {
      timestampStart,
      timestampEnd,
      totalHigh: totalHigh.toFixed(2),
      totalLow: totalLow.toFixed(2),
      totalVolume: totalVolume.toFixed(2),
    };
  }
}
