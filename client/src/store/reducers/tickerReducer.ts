import { IQuotes } from '../../model';
import { ActionsType } from '../actions/action.type';

interface ITicker {
  tickersList: string[];
  tickersData: IQuotes[];
  currentEl: string;
  fetchingInterval: number | null;
}

const initialState: ITicker = {
  tickersList: [],
  tickersData: [],
  currentEl: '',
  fetchingInterval: null,
};

export default function tickersReducer(
  state = initialState,
  action: ActionsType,
): ITicker {
  switch (action.type) {
    case 'TickersList/GET_LIST':
      return { ...state, tickersList: [...action.payload] };
    case 'TickersList/GET_DATA':
      return {
        ...state,
        tickersData: action.payload.quotes,
        fetchingInterval: action.payload.interval,
      };
    case 'TickersList/FILTER_TICKERS':
      return {
        ...state,
        tickersData: [...state.tickersData.filter((el) => el.ticker !== action.payload)],
      };
    case 'TickersList/SET_CURRENT_EL':
      return { ...state, currentEl: action.payload };
    case 'TickersList/SET_TIME_INTERVAL':
      return { ...state, fetchingInterval: action.payload };
    default:
      return state;
  }
}
