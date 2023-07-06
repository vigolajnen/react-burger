import React, { useState } from 'react';
import {
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useDispatch } from '../../hooks';
import { userLogin } from '../../services/actions/user';

// css
import styles from './login.module.css';

// страница авторизации.
export const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(userLogin(form)).then(() => {});
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <main className={styles.main}>
        <form onSubmit={login} className={styles.center}>
          <h1>Вход</h1>
          <div
            className={`${styles.inner}`}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              isIcon={false}
              autoComplete='username'
              id='email'
              required
            />
          </div>
          <div
            className={`${styles.inner}`}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              extraClass='mb-2'
              autoComplete='new-password'
              id='new-password'
              required
            />
          </div>
          <button type='submit' className={styles.button_type_primary}>
            Войти
          </button>
        </form>
        <div className='mb-2'>
          Вы — новый пользователь?
          <Link to='/register' className={styles.link}>
            {' '}
            Зарегистрироваться
          </Link>
        </div>
        <div className='mb-2'>
          Забыли пароль?
          <Link to='/forgot-password' className={styles.link}>
            {' '}
            Восстановить пароль
          </Link>
        </div>
      </main>
    </motion.div>
  );
};
