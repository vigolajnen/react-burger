import React, { useState, useCallback } from 'react';
import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userRegister } from '../services/actions/user';

import styles from './page.module.css';

// страница регистрации.
export function RegisterPage() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  const [form, setValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let register = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(userRegister(form));
    },
    [dispatch, form],
  );

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <main className={styles.main}>
      <form className={styles.center}>
        <h1>Регистрация</h1>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            icon={false}
            value={form.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
          />
        </div>
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
        <Button
          onClick={register}
          htmlType='button'
          type='primary'
          size='medium'
        >
          Зарегистрироваться
        </Button>
      </form>
      <div>
        Уже зарегистрированы?
        <Link to='/login' className={styles.link}>
          {' '}
          Войти
        </Link>
      </div>
    </main>
  );
}
