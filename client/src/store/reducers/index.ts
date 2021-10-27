import { combineReducers } from 'redux';
import watchListReducer from './watchListReducer';
import tickersReducer from './tickerReducer';
import commonReducer from './commonReducer';

export const rootReducer = combineReducers({
  watchList: watchListReducer,
  tickersReducer,
  commonReducer,
});
