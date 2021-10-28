import {AppDispatch} from '../index';
import socket from '../../socket';
import {IData, IQuotes} from '../../model';
import {
  CreateAllTickersList,
  GetTickersDataAction,
  GetTickersListAction,
  ResetIsLoadingAction,
  SetErrorAction,
  SetIsLoadingAction,
} from './actions';
import {AppThunk} from './action.type';

export const thunkGetData = (): AppThunk => async (dispatch: AppDispatch, getState) => {
  try {
    dispatch(SetIsLoadingAction());
    await socket.connect();
    socket.on('connect_error', err => {
      dispatch(SetErrorAction(`Loading Error: ${err.message}`))
      setTimeout(() => {
        socket.connect();
      }, 1000);
    })

    socket.on('connect', () => {
      console.log('Connected to Server. SocketID:', socket.id, socket.connected);
    });

    socket.emit('start');
    socket.once('ticker', (data: IData) => {
      const tickersNames: string[] = data.quotes.map((el: IQuotes) => el.ticker);
      dispatch(GetTickersListAction(tickersNames));
      dispatch(CreateAllTickersList(tickersNames));
      dispatch(GetTickersDataAction(data));
      dispatch(ResetIsLoadingAction());
    });
    socket.on('ticker', (data: IData) => {
      dispatch(GetTickersDataAction(data));
    });
    socket.on('disconnect', () => {
      socket.connect();
    })

  } catch (e) {
    dispatch(SetErrorAction(`Loading Error: ${e}`));
  }
};
