import React from 'react';
import s from './Button.module.scss';
import cn from 'classnames';

interface IProp {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: 'none' | 'green' | 'red';
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<IProp> = ({
  type = 'button',
  children,
  disabled = false,
  color = 'green',
  onClick,
}) => {
  return (
    <>
      <button
        type={type}
        className={cn(s.btn, s[color])}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
