import { ActionsType } from '../actions/action.type';

export interface IWatchList {
  id: number;
  name: string;
  data: string[];
}

interface WatchListState {
  list: IWatchList[];
}

const initialState: WatchListState = {
  list: [],
};

export default function watchListReducer(
  state = initialState,
  action: ActionsType,
): WatchListState {
  switch (action.type) {
    case 'WatchList/ADD_LIST':
      return {
        ...state,
        list: [...state.list, { id: Date.now(), name: action.payload, data: [] }],
      };
    case 'WatchList/CREATE_ALL_TICKERS_LIST':
      return {
        ...state,
        list: [
          { id: 1, name: 'All Tickers', data: action.payload },
          ...state.list.filter((el) => el.id !== 1),
        ],
      };
    case 'WatchList/ADD_TO_WATCHLIST':
      return {
        ...state,
        list: [...state.list.filter((el) => el.id !== action.payload.id), action.payload],
      };

    default:
      return state;
  }
}
