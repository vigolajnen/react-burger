import React, { useState, useCallback } from 'react';
import {
  Button,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { useAuth } from '../services/auth';

import { userLogin } from '../services/actions/user';
import styles from './page.module.css';

// страница авторизации.
export const LoginPage = () => {
  // let auth = useAuth();

  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.user.isAuth);

  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = useCallback(
    (e) => {
      e.preventDefault();
      // auth.signIn(form);

      dispatch(userLogin(form));
    },
    [dispatch, form],
  );

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  // Проверяем, авторизован ли пользователь
  // if (auth.user) {
  //   return (
  //     <Navigate
  //       to={'/'}
  //     />
  //   );
  // }

  return (
    <main className={styles.main}>
      <form className={styles.center}>
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
          />
        </div>
        <Button onClick={login} htmlType='button' type='primary' size='medium'>
          Войти
        </Button>
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
