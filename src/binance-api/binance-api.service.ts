import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import {
  BinanceApiParams,
  IbinanceHistoricalTrade,
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
  ): Promise<IbinanceHistoricalTrade[]> {
    const baseUrl = this.configService.get<string>('BINANCE_API');
    const { data } = await firstValueFrom(
      this.httpService
        .get<IbinanceHistoricalTrade[]>(`${baseUrl}/api/v3/klines`, {
          params: {
            symbol: `${this.configService.get<string>('SYMBOL')}`,
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
  }
}
