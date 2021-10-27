import React, {useState} from 'react';
import Button from "../ui/Button/Button";
import s from './CreateListPopup.module.scss'
import {useDispatch} from "react-redux";
import {addNewListAction} from "../../store/actions/actions";


const CreateListPopup: React.FC = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const okHandler = () => {
    dispatch(addNewListAction(value));
    setValue('');
  }

  const cancelHandler = () => {
    setValue('');

  }

  return (
    <div onClick={cancelHandler}>
      <div className={s.root} onClick={e => e.stopPropagation()}>
        <h2>Создание нового списка</h2>
        <input className={s.input} type="text" value={value} onChange={(e) => setValue(e.target.value)}
               placeholder="Название нового списка"/>
        <div className={s.controls}>
          <Button color='red' onClick={cancelHandler}>Отмена</Button>
          <Button disabled={!value} onClick={okHandler}>Создать</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateListPopup;