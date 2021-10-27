import React, { useCallback, useEffect, useState } from 'react';
import Button from '../ui/Button/Button';
import s from './CreateListForm.module.scss';
import { AddNewListAction } from '../../store/actions/actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';

interface IProp {
  modalHandler: () => void;
}

const CreateListForm: React.FC<IProp> = ({ modalHandler }) => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const escHandler = useCallback((event) => {
    if (event.keyCode === 27) {
      cancelHandler(event);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escHandler);
    return () => {
      document.removeEventListener('keydown', escHandler);
    };
  }, [escHandler]);

  const cancelHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setValue('');
    modalHandler();
  };
  const okHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(AddNewListAction(value));
    setValue('');
    modalHandler();
  };

  return (
    <form className={s.root} onSubmit={okHandler}>
      <h2>Создание нового списка</h2>
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Название нового списка"
      />
      <div className={s.controls}>
        <Button type="reset" color="red" onClick={cancelHandler}>
          Отмена
        </Button>
        <Button type="submit" disabled={!value}>
          Создать
        </Button>
      </div>
    </form>
  );
};

export default CreateListForm;
