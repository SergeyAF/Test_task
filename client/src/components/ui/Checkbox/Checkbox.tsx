import React, { useState } from 'react';
import s from './Checkbox.module.scss';
import cn from 'classnames';
import { ReactComponent as CheckSVG } from './assets/Checked.svg';

interface IProps {
  id: string;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (id: string, check: boolean) => void;
}
const Checkbox: React.FC<IProps> = ({
  children,
  id,
  onClick,
  checked = false,
  className = null,
  disabled = false,
}) => {
  const [isChecked, setChecked] = useState(checked);
  const handleChange = () => {
    if (!disabled) {
      setChecked(!isChecked);
      if (onClick) onClick(id, isChecked);
    }
  };
  return (
    <div className={cn(s.root, className)}>
      <label htmlFor={id}>
        <div
          className={cn(
            s.new_check_box,
            !isChecked ? s.hide : null,
            disabled ? s.disabled : null,
          )}
        >
          <CheckSVG />
        </div>
        <input
          type="checkbox"
          className={s.old_check_box}
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
