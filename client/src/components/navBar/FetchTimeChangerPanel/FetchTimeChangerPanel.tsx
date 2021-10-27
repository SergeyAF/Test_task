import React from 'react';
import socket from '../../../socket';

import s from './FetchTimeChangerPanel.module.scss';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { SetTimeIntervalAction } from '../../../store/actions/actions';

const FetchTimeChangerPanel: React.FC = () => {
  const currentInterval = useSelector(
    (state: RootState) => state.tickersReducer.fetchingInterval,
  );
  const dispatch = useAppDispatch();
  const refreshIntervalList = [
    { name: '1 сек', time: 1000 },
    { name: '2 сек', time: 2000 },
    { name: '5 сек', time: 5000 },
    { name: '10 сек', time: 10000 },
  ];

  const setRefreshInterval = (time: number) => {
    socket.emit('changeInterval', time);
    dispatch(SetTimeIntervalAction(time));
  };

  return (
    <div className={s.root}>
      <div className="nav_header">Изменить интервал обновления</div>
      <div className={s.wrapper}>
        {refreshIntervalList.map((el) => (
          <div
            className={cn(s.element, el.time === currentInterval ? s.active : null)}
            key={el.name}
            onClick={() => {
              setRefreshInterval(el.time);
            }}
          >
            {el.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchTimeChangerPanel;
