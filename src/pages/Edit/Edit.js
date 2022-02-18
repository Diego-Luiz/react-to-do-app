import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FormToDo, 
  InputToDo, 
  Error
} from '../../components';
import { createTodo } from '../../modules';
import styles from './Edit.module.css';

function Edit({ toDos, handleDataChange, Errors, removeError, setErrorState }){
  const [ inputToDo, setInputToDo ] = useState('');
  const navigate = useNavigate();
  
  let { id } = useParams();
  id = Number(id);
  let actualToDo = toDos.find(todo => (todo.id === id));

  useEffect(() => {
    if(actualToDo) setInputToDo(actualToDo.content);
  }, [actualToDo]);

  const handleEditTodo = (evt) => {
    evt.preventDefault();
    if(!inputToDo){
      const actualErrors = {...Errors};
      actualErrors.editInputTodo.add('Cannot add an empty description to the To Do');
      setErrorState(actualErrors);
      return;
    }
    const newToDo = createTodo(actualToDo.id, inputToDo, actualToDo.completed);
    const afterEditToDos = toDos.map(todo => {
      if(todo.id === id) return newToDo;
      return todo;
    });
    handleDataChange({toDos: afterEditToDos}, afterEditToDos);
    navigate('/');
  }
  const handleChange = (evt) => {
    setInputToDo(evt.target.value);
  }
  return (
    <>
      <h1 className={styles['page-title']}>Edit To Do</h1>
      {Errors.editInputTodo.size > 0 && <Error 
        Errors={Errors.editInputTodo}
        removeError={removeError.bind(this, ['editInputTodo'])}
      />}
      <FormToDo
        handleSubmit={handleEditTodo}
        btnText={'Save changes'}
        btnType={'--edit'}
      > 
        <InputToDo 
          inputToDo={inputToDo}
          handleChange={handleChange}
          functionText={'Edit to do'}
        />
      </FormToDo>
    </>
  )
}

export default Edit;