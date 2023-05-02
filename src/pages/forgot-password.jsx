import React from 'react';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
// import appStyles from './login.module.css';

// страница восстановления пароля.
export function ForgotPasswordPage() {
  const [valueEmail, setValueEmail] = React.useState('');

  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  return (
    <main className={styles.main}>
      <form className={styles.center}>
        <h1>Восстановление пароля</h1>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <EmailInput
            onChange={onChangeEmail}
            value={valueEmail}
            name={'email'}
            isIcon={false}
            placeholder={'Укажите e-mail'}
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
