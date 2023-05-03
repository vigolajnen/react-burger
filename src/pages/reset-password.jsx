import React from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
// import appStyles from './login.module.css';

// страница восстановления пароля.
export function ResetPasswordPage() {
  const [valuePassword, setValuePassword] = React.useState('');
  const [value, setValue] = React.useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  return (
    <main className={styles.main}>
      <form className={styles.center}>
        <h1>Восстановление пароля</h1>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <PasswordInput
            onChange={onChangePassword}
            value={valuePassword}
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
            value={value}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass='ml-1'
          />
        </div>
        <Button htmlType='button' type='primary' size='medium'>
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
