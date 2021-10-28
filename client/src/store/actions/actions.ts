import { IData } from '../../model';
import { IWatchList } from '../reducers/watchListReducer';

//---------------  WatchList Reducer ---------------

export const AddNewListAction = (listName: string) => {
  return {
    type: 'WatchList/ADD_LIST',
    payload: listName,
  } as const;
};

export const CreateAllTickersList = (list: string[]) => {
  return {
    type: 'WatchList/CREATE_ALL_TICKERS_LIST',
    payload: list,
  } as const;
};

export const ChangeWatchlistDataAction = (listId: IWatchList) => {
  return {
    type: 'WatchList/ADD_TO_WATCHLIST',
    payload: listId,
  } as const;
};

//---------------  TickersList Reducer ---------------

export const GetTickersListAction = (list: string[]) => {
  return {
    type: 'TickersList/GET_LIST',
    payload: list,
  } as const;
};

export const GetTickersDataAction = (data: IData) => {
  return {
    type: 'TickersList/GET_DATA',
    payload: data,
  } as const;
};

export const FilterTickersDataAction = (ticker: string) => {
  return {
    type: 'TickersList/FILTER_TICKERS',
    payload: ticker,
  } as const;
};

export const SetCurrentElementAction = (element: string) => {
  return {
    type: 'TickersList/SET_CURRENT_EL',
    payload: element,
  } as const;
};

export const SetTimeIntervalAction = (time: number) => {
  return {
    type: 'TickersList/SET_TIME_INTERVAL',
    payload: time,
  } as const;
};

export const SetFetchingIntervalAction = (interval: number) => {
  return {
    type: 'TickersList/SET_FETCHING_INTERVAL',
    payload: interval,
  } as const;
};

//---------------  Common Reducer ---------------

export const SetConnectionAction = (flag: boolean) => {
  return {
    type: 'Common/SET_CONNECTION',
    payload: flag,
  } as const;
};

export const ChangeIsLoadingAction = (flag: boolean) => {
  return {
    type: 'Common/CHANGE_IsLOADING',
    payload: flag,
  } as const;
};

export const SetErrorAction = (error: string) => {
  return {
    type: 'Common/SET_ERROR',
    payload: error,
  } as const;
};
