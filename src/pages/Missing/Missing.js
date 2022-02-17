import { Link } from 'react-router-dom';
import styles from './Missing.module.css';

function Missing(){
  return (
    <>
      <h1 className={styles['missing-title']}>This page does not exist.</h1>
      <Link to='/' className={styles['missing-link']}>
        <span>Go to home page</span>
      </Link>
    </>
  );
}

export default Missing;