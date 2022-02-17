import styles from './Formtodo.module.css';
import React from 'react';


function FormToDo({ children, handleSubmit, btnText, btnType }){
  return (
    <form 
      className={[styles['form-todo'], styles[btnType]].join(' ')}
      onSubmit={handleSubmit}
    >
      {children}
      <button
        type="submit"
        className={`${styles['form-todo__btn-submit']} ${styles[btnType]}`}
      >
        {btnText}
      </button>
    </form>
  );
}

export default FormToDo;
