import { Link } from 'react-router-dom';
import styles from './Todo.module.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function Todo({ todo:{ id, content, completed }, handleDelete, handleToDoClick, color, noTransition }){
  let completedClass = completed ? '--completed' : '';
  return (
    <div className={[styles['todo'], styles[`${noTransition}`], styles[`--${color}`], styles[completedClass]].join(' ')}>
      <button 
        className={styles['todo__content']}
        onClick={handleToDoClick.bind(this, id)}
      >
        <span className='sr-only'>Description:</span>
        {content}
        <span className='sr-only'>, click to change the state of this to do</span>
      </button>
      <Link 
        to={`/edit/${id}`}
        className={styles['todo__btn-edit']}
      >
        <span className='sr-only'>Edit To do</span>
        <FaEdit />
      </Link>
      <button
        onClick={handleDelete.bind(this, id )}
        className={styles['todo__btn-delete']}
      > 
        <span className='sr-only'>Delete To do</span>
        <FaTrashAlt />
      </button>
    </div>
  );
}

export default Todo;