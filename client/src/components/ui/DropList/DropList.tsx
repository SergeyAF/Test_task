import React from 'react';
import s from './DropList.module.scss';
import cn from 'classnames';

interface IProp {
  active?: boolean;
  setActive: () => void;
}

const DropList: React.FC<IProp> = ({ children, active = false, setActive }) => {
  return <div className={cn(s.root, active ? s.visible : null)}>{children}</div>;
};

export default DropList;
