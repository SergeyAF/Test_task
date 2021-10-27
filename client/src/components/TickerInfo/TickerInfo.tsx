import React, { useEffect, useState } from 'react';
import { IQuotes } from '../../model';

import s from './TickerInfo.module.scss';
import Button from '../ui/Button/Button';
import CreateListForm from '../CreateListForm/CreateListForm';
import Modal from '../ui/Modal/Modal';
import DropList from '../ui/DropList/DropList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IWatchList } from '../../store/reducers/watchListReducer';
import { RouteComponentProps } from 'react-router-dom';
import { ChangeWatchlistDataAction } from '../../store/actions/actions';

type TParams = { id: string };

const TickerInfo: React.FC<RouteComponentProps<TParams>> = ({
  history,
  match: {
    params: { id },
  },
}) => {
  const [visible, setVisible] = useState(false);
  const [dropListVisible, setDropListVisible] = useState(false);
  const list = useSelector((state: RootState) => state.watchList.list);
  const allElements = useSelector((state: RootState) => state.tickersReducer.tickersData);
  const currentElement: IQuotes = !id
    ? { ...allElements[0] }
    : { ...allElements.filter((el) => el.ticker === id)[0] };
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== currentElement?.ticker && allElements.length) {
      history.push(`/${allElements[0]?.ticker}`);
    }
  });

  const changeVisible = () => {
    setVisible(false);
    setDropListVisible(false);
  };

  const dropListHandler = () => {
    setDropListVisible(false);
  };

  const watchListHandler = (list: IWatchList, id: string) => () => {
    if (list.data.includes(id)) {
      const index = list.data.indexOf(id);
      list.data.splice(index, 1);
    } else {
      list.data.push(id);
    }
    dispatch(ChangeWatchlistDataAction(list));
    setDropListVisible(false);
  };

  if (!currentElement) {
    return <div>Loading ...</div>;
  }

  if (!allElements.length) {
    return <div>Выберете хотя бы одну акцию</div>;
  }

  return (
    <div>
      <div className={s.header}>
        <div className={s.name_wrapper}>
          <div className={s.short_name}>{currentElement.ticker}</div>
          <div className={s.name}>{currentElement.ticker}</div>
        </div>
        <div className={s.btn_wrapper}>
          <Button
            onClick={() => {
              // setVisible(!visible)
              setDropListVisible(!dropListVisible);
            }}
          >
            Подписаться
          </Button>
          <DropList setActive={dropListHandler} active={dropListVisible}>
            <ul>
              {list
                .filter((el: IWatchList) => el.name !== 'All Tickers')
                .map((el: IWatchList) => (
                  <li
                    key={el.id}
                    className={
                      el.data.includes(currentElement.ticker) ? s.inList : undefined
                    }
                    onClick={watchListHandler(el, currentElement.ticker)}
                  >
                    {el.name}
                  </li>
                ))}
              <li
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                Add new list
              </li>
            </ul>
          </DropList>
        </div>
      </div>
      <div className={s.main_info_wrapper}>
        <div className={s.price}>{currentElement.price}</div>
        <div className={s.pct_wrapper}>
          <div className="icon">˄</div>
          <div className="pct_change">{currentElement.change_percent}</div>
        </div>
        <div className={s.abs_change}>{currentElement.change}</div>
      </div>
      <div className={s.add_info}>
        {currentElement.last_trade_time} · {currentElement.exchange} · Отказ от
        обязательств
      </div>
      <Modal setActive={changeVisible} active={visible}>
        <CreateListForm modalHandler={changeVisible} />
      </Modal>
    </div>
  );
};

export default TickerInfo;
