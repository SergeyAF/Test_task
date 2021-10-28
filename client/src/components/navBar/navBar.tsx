import React from 'react';
import { IPropWithClassName } from '../../model';
import s from './navBar.module.scss';
import cn from 'classnames';
import Checkbox from '../ui/Checkbox/Checkbox';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import socket from '../../socket';
import { FilterTickersDataAction } from '../../store/actions/actions';
import FetchTimeChangerPanel from './FetchTimeChangerPanel/FetchTimeChangerPanel';
import WatchList from './WatchList/WatchList';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const NavBar: React.FC<IPropWithClassName> = ({ className = null }) => {
  const tickersList = useSelector((state: RootState) => state.tickersReducer.tickersList);
  const dispatch = useAppDispatch();

  const filterHandler = (ticker: string, check: boolean) => {
    if (check) {
      socket.emit('FILTER_TICKERS', { type: 'add', data: ticker });
      dispatch(FilterTickersDataAction(ticker));
    } else {
      socket.emit('FILTER_TICKERS', { type: 'sub', data: ticker });
    }
  };
  console.log('Render naw');
  return (
    <div className={cn(s.root, className)}>
      <div className="nav_header">Список отображаемых акций</div>
      {tickersList.map((el) => (
        <Checkbox
          className="ticker_list"
          id={el}
          checked
          onClick={filterHandler}
          key={el}
        >
          {el}
        </Checkbox>
      ))}
      <FetchTimeChangerPanel />
      <WatchList />
    </div>
  );
};

export default React.memo(NavBar);
