import React from 'react';
import s from './Modal.module.scss';
import cn from 'classnames';

interface IProp {
  active?: boolean;
  setActive: () => void;
}

const Modal: React.FC<IProp> = ({ children, active = false, setActive }) => {
  return (
    <div className={cn(s.modal, active ? s.visible : null)} onClick={setActive}>
      <div className={s.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
