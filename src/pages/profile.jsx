import React from 'react';
import {
  Input,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
// import appStyles from './login.module.css';

// страница с настройками профиля пользователя
export function ProfilePage() {
  const [value, setValue] = React.useState('Вася');
  const [valueEmail, setValueEmail] = React.useState('dd@dd.ru');
  const [valuePassword, setValuePassword] = React.useState('12345');
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
    <main className={styles.grid}>
      
      <aside className={styles.sidebar}>
      <h1 className={styles.title}>Профиль</h1>
        <div className={styles.item}>История заказов</div>
        <Link className={styles.item}>Выход</Link>
        <div className={styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </aside>
      <form className={styles.content}>
        <div
          className='mb-4'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Input
            onChange={onChange}
            type={'text'}
            placeholder={'Имя'}
            icon="EditIcon"
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
            placeholder='Логин'
            isIcon={true}
            extraClass='mb-2'
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
            icon="EditIcon"
            extraClass='mb-2'
          />
        </div>
      </form>
    </main>
  );
}
