import React from 'react';
import { IPropWithClassName, IQuotes } from '../../model';
import SmallTickerCard from '../SmallTickerCard/SmallTickerCard';
import cn from 'classnames';
import s from './TickerDashboard.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const TickerDashboard: React.FC<IPropWithClassName> = ({
  children,
  className = null,
}) => {
  const tickersData = useSelector((state: RootState) => state.tickersReducer.tickersData);

  return (
    <div className={cn(s.root, className)}>
      {tickersData.map((el: IQuotes) => (
        <SmallTickerCard key={el.ticker} data={el} />
      ))}
    </div>
  );
};

export default TickerDashboard;
