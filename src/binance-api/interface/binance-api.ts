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

export type BinanceKline = [
  number,
  string,
  string,
  string,
  string,
  string,
  number,
  string,
  number,
  string,
  string,
];
