import { Test, TestingModule } from '@nestjs/testing';
import { BinanceApiController } from './binance-api.controller';

describe('BinanceApiController', () => {
  let controller: BinanceApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BinanceApiController],
    }).compile();

    controller = module.get<BinanceApiController>(BinanceApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
