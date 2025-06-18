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
  interval?: string;
  startTime?: string;
  endTime?: string;
};
