import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { motion } from 'framer-motion';

import { useDispatch, useSelector } from '../../hooks';
import { setForgotPassword } from '../../services/actions/user';
import { resetPasswordRequest } from '../../services/api-auth';

// css
import styles from './reset-password.module.css';

// страница восстановления пароля.
export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setValue] = useState({ password: '', token: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const { isPageForgotPass } = useSelector((store) => store.user);

  useEffect(() => {
    if (!isPageForgotPass) {
      navigate('/forgot-password');
    }
  }, [isPageForgotPass, navigate]);

  let reset = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    (
      resetPasswordRequest({
        password: form.password,
        token: form.token,
      }) as unknown as Promise<unknown>
    ).then(() => {
      navigate('/', { replace: true });
    });
    dispatch(setForgotPassword(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
              required
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
              // icon={false}
              value={form.token}
              name={'token'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass='ml-1'
              required
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
    </motion.div>
  );
}
