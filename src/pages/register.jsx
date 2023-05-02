import React from 'react';
import {
  Button,
  Input,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
// import appStyles from './login.module.css';

// страница регистрации.
export function RegisterPage() {
  const [value, setValue] = React.useState('');
  const [valueEmail, setValueEmail] = React.useState('');
  const [valuePassword, setValuePassword] = React.useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
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
            onChange={(e) => setValue(e.target.value)}
            icon={false}
            value={value}
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
            onChange={onChangeEmail}
            value={valueEmail}
            name={'email'}
            isIcon={false}
          />
        </div>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <PasswordInput
            onChange={onChangePassword}
            value={valuePassword}
            name={'password'}
            extraClass='mb-2'
          />
        </div>
        <Button htmlType='button' type='primary' size='medium'>
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
