import React, { useState } from 'react';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import { resetPasswordRequest } from '../../services/api-auth';

import styles from './reset-password.module.css';

// страница восстановления пароля.
export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [form, setValue] = useState({ password: '', token: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let reset = (e) => {
    e.preventDefault();
    resetPasswordRequest({ password: form.password, token: form.token }).then(
      () => {
        navigate('/', { replace: true });
      },
    );
  };

  return (
    <main className={styles.main}>
      <form onSubmit={reset} className={styles.center}>
        <h1>Восстановление пароля</h1>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <PasswordInput
            onChange={onChange}
            value={form.password}
            autoComplete='off'
            name={'password'}
            extraClass='mb-2'
            placeholder={'Введите новый пароль'}
          />
        </div>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            icon={false}
            value={form.token}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
          />
        </div>
        <button type='submit' className={styles.button_type_primary}>
          Восстановить
        </button>
      </form>
      <div>
        Вспомнили пароль?
        <Link to='/login' className={styles.link}>
          {' '}
          Войти
        </Link>
      </div>
    </main>
  );
}
