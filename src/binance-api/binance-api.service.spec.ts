import { HttpService } from '@nestjs/axios';
import { BinanceApiService } from './binance-api.service';
import { ConfigService } from '@nestjs/config';

describe('BinanceApiService', () => {
  let service: BinanceApiService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
    } as unknown as HttpService;
  });
});
