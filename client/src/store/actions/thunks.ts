import { AppDispatch } from '../index';
import socket from '../../socket';
import { IData, IQuotes } from '../../model';
import {
  ChangeIsLoadingAction,
  CreateAllTickersList,
  GetTickersDataAction,
  GetTickersListAction,
  SetConnectionAction,
  SetErrorAction,
} from './actions';
import { AppThunk } from './action.type';

export const thunkGetData = (): AppThunk => async (dispatch: AppDispatch, getState) => {
  try {
    dispatch(ChangeIsLoadingAction(true));

    socket.on('connect', async () => {
      dispatch(SetConnectionAction(true));
      dispatch(SetErrorAction(''));

      const data: IData = await new Promise((resolve, reject) => {
        socket.emit('start');
        socket.once('ticker', (data: IData) => {
          resolve(data);
        });
        socket.once('connect_error', (err) => reject(err.message));
      });

      const tickersNames: string[] = data.quotes.map((el: IQuotes) => el.ticker);
      dispatch(GetTickersListAction(tickersNames));
      dispatch(CreateAllTickersList(tickersNames));
      dispatch(GetTickersDataAction(data));
      dispatch(ChangeIsLoadingAction(false));
    });

    socket.on('connect_error', (err) => {
      dispatch(
        SetErrorAction(
          `Loading Error: ${
            err.message === 'xhr poll error'
              ? 'Прервано соединение с сервером'
              : err.message
          }`,
        ),
      );
      dispatch(SetConnectionAction(false));
      setTimeout(() => {
        socket.connect();
      }, 1000);
    });

    socket.on('ticker', (data: IData) => {
      dispatch(GetTickersDataAction(data));
    });
    socket.on('disconnect', () => {
      socket.connect();
    });
  } catch (e) {
    dispatch(SetErrorAction(`Loading Error: ${e}`));
  }
};
