export interface IbinanceHistoricalTrade {
  a: number;
  p: string;
  q: string;
  f: number;
  l: number;
  T: number;
  m: boolean;
  M: boolean;
}

export type BinanceApiParams = {
  interval: string;
  startTime?: string;
  endTime?: string;
};

export type AnalyzedData = {
  timestamp: number;
  priceChange: number;
  percentageChange: number;
  directionOfChanges: 'UP' | 'DOWN';
};
