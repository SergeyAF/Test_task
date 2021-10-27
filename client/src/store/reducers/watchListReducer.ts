import {ActionsType} from "../../actions/action.type";

export interface IWatchList {
  id: number,
  name: string,
  data: string[]
}

interface WatchListState {
  list: IWatchList[]
}

const initialState:WatchListState = {
  list: []
}

export default function watchListReducer (state = initialState, action:ActionsType): WatchListState {
  switch (action.type) {
    case 'WatchList/ADD_LIST':
      return {...state, list: [...state.list, {id: Date.now(),name:action.payload, data:[]}]}
    case 'WatchList/GET_ALL_TICKERS_LIST':
      return {...state, list: [action.payload, ...state.list]}

    default:
      return state
  }
}
