import styles from './Inputtodo.module.css';
import React from 'react';

const InputToDo = React.forwardRef((props, ref) => getInputToDo(props, ref));

function getInputToDo({ inputToDo, handleChange, functionText='' }, ref){
  let contentClass = '';
  let placeholderTxt = functionText;
  if(!functionText.includes('Add')){
    contentClass = 'edit-page';
    placeholderTxt = ''
  }
  return (
    <>
      <label  
        htmlFor={styles['form-todo__input']}
        className="sr-only"
      >
        {functionText}
      </label>
      {contentClass === 'edit-page' ? (
          <textarea 
            id={styles['form-todo__input']}
            className={styles[contentClass]}
            value={inputToDo}
            onChange={handleChange}
          ></textarea>
        ) : (
          <input 
            type='text'
            placeholder={placeholderTxt}
            id={styles['form-todo__input']}
            onChange={handleChange}
            value={inputToDo}
            ref={ref}
          />
      )}
    </>
  )
}

export default InputToDo;