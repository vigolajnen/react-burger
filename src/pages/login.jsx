import React from 'react';
import {
  Button,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './page.module.css';
// import appStyles from './login.module.css';

// страница авторизации.
export const LoginPage = () => {
  const [value, setValue] = React.useState('');
  const [valuePassword, setValuePassword] = React.useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
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
            value={value}
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
          Войти
        </Button>
      </form>
    </main>
  );
};
