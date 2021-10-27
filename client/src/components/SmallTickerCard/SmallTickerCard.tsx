import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import s from './SmallTickerCard.module.scss';
import { IPropWithClassName, IQuotes } from '../../model';
import { useHistory } from 'react-router-dom';
import { SetCurrentElementAction } from '../../store/actions/actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';

interface IProps {
  data?: IQuotes;
}

const SmallTickerCard: React.FC<IProps & IPropWithClassName> = ({
  className = null,
  data,
}) => {
  const [animated, setAnimated] = useState('');
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    setAnimated('animated');
  }, [data]);

  if (!data) {
    return <div></div>;
  }

  const setElementHandler = () => {
    dispatch(SetCurrentElementAction(data.ticker));
    history.push(`/${data?.ticker}`);
  };

  return (
    <div className={cn(s.root, className)} onClick={setElementHandler}>
      <div className={cn(s.icon, data.change > 0 ? s.inc_rate : null)}>
        {data.change > 0 ? '˄' : '˅'}
      </div>
      <div className={s.wrapper}>
        <div className={s.info}>
          <div className={s.name}>{data.ticker}</div>
          <div className={cn(s.price, s[animated])}>{data.price}$</div>
        </div>
        <div className={cn(s.changes, data.change > 0 ? s.inc_rate : null)}>
          <div className={cn(s.pct_changes, s[animated])}>{data.change_percent} %</div>
          <div className={cn(s.abs_changes, s[animated])}>{data.change}</div>
        </div>
      </div>
    </div>
  );
};

export default SmallTickerCard;
