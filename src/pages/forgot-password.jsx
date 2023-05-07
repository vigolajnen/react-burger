import React, { useCallback, useState } from 'react';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import {
  passwordResetRequest,
  checkResponse,
  checkSuccess,
} from '../services/api';
import styles from './page.module.css';

// страница восстановления пароля.
export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [form, setValue] = useState({ email: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let reset = useCallback(
    (e) => {
      e.preventDefault();
      passwordResetRequest(form)
        .then(checkResponse)
        .then(checkSuccess)
        .then(() => {
          navigate('/reset-password', { replace: true });
        });
    },
    [form, navigate],
  );

  return (
    <main className={styles.main}>
      <form className={styles.center}>
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
        <Button onClick={reset} htmlType='button' type='primary' size='medium'>
          Восстановить
        </Button>
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
