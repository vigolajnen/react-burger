import React, { useState } from 'react';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { forgotPasswordRequest } from '../../services/api-auth';
import styles from './forgot-password.module.css';
import { useSelector } from '../../hooks';

// страница восстановления пароля.
export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const [form, setValue] = useState({ email: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const reset = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    (forgotPasswordRequest(form.email) as unknown as Promise<unknown>)
      .then(() => {
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <main className={styles.main}>
      <form onSubmit={reset} className={styles.center}>
        <h1>Восстановление пароля</h1>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            isIcon={false}
            placeholder={'Укажите e-mail'}
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
