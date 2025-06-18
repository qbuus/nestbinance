export type BinanceApiParams = {
  interval: string;
  startTime?: string;
  endTime?: string;
};

export type AnalyzedData = {
  timestampStart: number;
  timestampEnd: number;
  totalHigh: number;
  totalLow: number;
  totalVolume: number;
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
