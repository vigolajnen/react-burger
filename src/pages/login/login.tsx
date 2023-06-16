import React, { useState } from 'react';
import {
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';

import { userLogin } from '../../services/actions/user';

import styles from './login.module.css';

// страница авторизации.
export const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth);
  const [form, setValue] = useState({ email: '', password: '' });
  const from = location.state?.from?.pathname || '/'; 

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(userLogin(form));
  };

  if (isAuth) {
    return <Navigate to={from} />;
  }

  return (
    <main className={styles.main}>
      <form onSubmit={login} className={styles.center}>
        <h1>Вход</h1>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            isIcon={false}
          />
        </div>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            extraClass='mb-2'
            autoComplete='off'
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
  );
};
