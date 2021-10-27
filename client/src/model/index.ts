export interface IData {
  interval: number;
  quotes: IQuotes[];
}

export interface IQuotes {
  ticker: string;
  exchange: string;
  price: number;
  change: number;
  change_percent: number;
  dividend: number;
  yield: number;
  last_trade_time: string;
}

export interface IPropWithClassName {
  className?: string;
}
