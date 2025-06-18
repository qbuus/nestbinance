import { HttpService } from '@nestjs/axios';
import { BinanceApiService } from './binance-api.service';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

const dummy_data = [
  [
    1625097600000,
    '34000',
    '35000',
    '33500',
    '34500',
    '1200',
    0,
    '0',
    0,
    '0',
    '0',
  ],
  [
    1625184000000,
    '34500',
    '35500',
    '34000',
    '35000',
    '1500',
    0,
    '0',
    0,
    '0',
    '0',
  ],
];

describe('BinanceApiService', () => {
  let service: BinanceApiService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
    } as unknown as HttpService;

    configService = {
      getOrThrow: jest.fn().mockImplementation((key: string) => {
        if (key === 'BINANCE_API') return 'https://api.binance.com';
        if (key === 'SYMBOL') return 'BTCUSDT';
        return null;
      }),
    } as unknown as ConfigService;

    service = new BinanceApiService(httpService, configService);
  });

  it('Should return proper historical data from binance api', async () => {
    (httpService.get as jest.Mock).mockReturnValue(of({ data: dummy_data }));

    const result = await service.getHistoricalData({ interval: '1d' });
    expect(result).toEqual(dummy_data);

    expect(httpService.get).toHaveBeenCalledWith(
      expect.stringContaining('https://api.binance.com/api/v3/klines'),
      expect.objectContaining({
        params: expect.objectContaining({
          symbol: 'BTCUSDT',
          interval: '1d',
          limit: 200,
        }),
      }),
    );
  });

  it('Should analyze data properly', () => {
    const analyzedData = service.analyzeHistoricalData(dummy_data);

    expect(analyzedData).toEqual({
      timestampStart: 1625097600000,
      timestampEnd: 1625184000000,
      totalHigh: 35000,
      totalLow: 34000,
      totalVolume: 1200,
    });
  });
});
