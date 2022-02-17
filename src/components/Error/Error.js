import React from 'react';
import styles from './Error.module.css';
import { IoIosCloseCircle } from 'react-icons/io';

function Error({ Errors, removeError, fieldsToReset }){
  const ErrorsInput = Array.from(Errors);
  return (
    <div className={styles['error']}>
      <p className={styles['error__msg']}>
        Errors: {ErrorsInput.map((error, index) => (
                  <React.Fragment
                    key={error}
                  > 
                    {`${error}${index === ErrorsInput.length - 1 ? '.' : ','} `}
                  </React.Fragment>
                ))} 
      </p>
      
      <button 
        type='button' 
        className={styles['error__close-btn']}
        onClick={removeError.bind(this, fieldsToReset)}
      >
        {<IoIosCloseCircle />}
      </button>
    </div>
  )
}

export default Error;