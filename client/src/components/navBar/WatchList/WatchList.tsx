import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import s from './WatchList.module.scss';
import cn from 'classnames';
import { IWatchList } from '../../../store/reducers/watchListReducer';
import { GetTickersListAction } from '../../../store/actions/actions';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import socket from '../../../socket';

const WatchList: React.FC = () => {
  const { list } = useSelector((state: RootState) => state.watchList);
  const dispatch = useAppDispatch();
  const changeListHandler = (data: string[]) => () => {
    if (data.length) {
      dispatch(GetTickersListAction(data));
      socket.emit('CHANGE_LIST', data);
    }
  };

  return (
    <>
      <div className={cn(s.root, 'nav_header')}>Списки отслеживания</div>
      {list.map((el: IWatchList) => (
        <div
          className={cn(s.wrapper, !el.data.length ? s.empty : null)}
          key={el.name}
          onClick={changeListHandler(el.data)}
        >
          {el.name}
        </div>
      ))}
    </>
  );
};

export default WatchList;
