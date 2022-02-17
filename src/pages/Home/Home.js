import styles from './Home.module.css';
import React from 'react';
import { 
  Todo,
  FormToDo,
  InputToDo,
  Error
} from '../../components';

const Home = React.forwardRef((props, ref) => getHomePage(props, ref));

function TodosList({ toDos, handleDelete, handleToDoClick, noTransition }){
  const colors = ['blue', 'orange', 'purple', 'pink'];
  let counter = 0;
  return (
    <ul className={styles['todo-list']}>
      {
        toDos.map((todo) => {
          counter = counter + 1 > 3 ? 0 : counter + 1;
          return (
            <li 
              key={todo.id}
              className={styles['todo-list__item']}
            >
              <Todo 
                todo={todo}
                handleDelete={handleDelete}
                handleToDoClick={handleToDoClick}
                color={colors[counter]}
                noTransition={noTransition}
              />
            </li>
          );
        })
      }
    </ul>
  );
}

function getHomePage({ inputToDo, handleChange, handleSubmit, toDos, handleDelete, handleToDoClick, Errors, removeError, noTransition }, ref){
  const getItemsRemaing = () => {
    let itemsRemaing = toDos.filter(todo => !todo.completed);
    return itemsRemaing.length;
  }
  return (
    <>
      <h1 className={styles['app-title']}>What's the Plan for Today?</h1>
      {Errors.newInputTodo.size > 0 && <Error 
        Errors={Errors.newInputTodo}
        removeError={removeError.bind(this, ['newInputTodo'])}
      />}
      <FormToDo 
        handleSubmit={handleSubmit}
        btnText={'Add'}
        btnType={'--add'}
      >
        <InputToDo 
          inputToDo={inputToDo}
          handleChange={handleChange}
          functionText={'Add to do'}
          ref={ref}
        />
      </FormToDo>
      <p className={styles['todos-quantity']}>{getItemsRemaing()} items remaining</p>
      {toDos.length > 0 &&
        <TodosList 
          toDos={toDos}
          handleDelete={handleDelete}
          handleToDoClick={handleToDoClick}
          noTransition={noTransition}
        />
      }
    </>
  );
}

export default Home;