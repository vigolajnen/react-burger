import React, { useCallback, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import {
  createTestUser,
  passwordNewRequest,
  checkResponse,
  checkSuccess,
} from '../services/api';

import { unitTestUser } from '../services/actions/user';

import styles from './page.module.css';

// страница восстановления пароля.
export function ResetPasswordPage() {
  // const navigate = useNavigate();
  const [form, setValue] = useState({ password: '', code: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let reset = useCallback(
    (e) => {
      e.preventDefault();
      // unitTestUser();
      passwordNewRequest(form).then(checkResponse).then(checkSuccess);

      // postUserRequest();
      createTestUser();
    },
    [form],
  );

  return (
    <main className={styles.main}>
      <form className={styles.center}>
        <h1>Восстановление пароля</h1>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <PasswordInput
            onChange={onChange}
            value={form.password}
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
            value={form.code}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
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
