import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import s from './WatchList.module.scss'
import cn from "classnames";

const WatchList:React.FC = () => {
  const list = useSelector((state: RootState) => state.watchList.list)

  return (
    <>
      <div className={cn(s.root, "nav_header")}>Списски отслеживания</div>
      {list.map(el => (
          <div className={s.wrapper} key={el.name}>{el.name}</div>
        )
      )}
    </>
  );
};

export default WatchList;