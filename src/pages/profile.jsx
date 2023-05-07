import React, { useCallback } from 'react';
import {
  Input,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { USER_LOGOUT } from '../services/actions/user';
import { logoutRequest } from '../services/api';
import { deleteCookie } from '../services/utils';
import styles from './page.module.css';

export function ProfilePage() {
  const dispatch = useDispatch();
  let location = useLocation();

  let activeLink = location.pathname.substring(1);

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuth);

  const logout = useCallback(async () => {
    await logoutRequest();
    dispatch({
      type: USER_LOGOUT,
    });
    deleteCookie('token');

    if (!isAuth) {
      return <Navigate to='/' replace />;
    }
  }, [dispatch]);

  const [value, setValue] = React.useState(undefined ? 'ff' : user.name);
  const [valueEmail, setValueEmail] = React.useState(
    undefined ? 'ff' : user.email,
  );
  const [valuePassword, setValuePassword] = React.useState('1234567');
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
  const setActiveLink = ({ isActive }) =>
    isActive ? styles.itemActive : styles.item;

  return (
    <main className={styles.grid}>
      <aside className={styles.sidebar}>
        <NavLink to='' className={setActiveLink}>
          Профиль
        </NavLink>
        <NavLink to='orders' className={setActiveLink}>
          История заказов
        </NavLink>
        <Link onClick={logout} className={styles.item}>
          Выход
        </Link>
        <div className={styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </aside>

      <div className={styles.content}>
        {activeLink === 'profile' ? (
          <form className={styles.content}>
            <div
              className='mb-4'
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Input
                onChange={onChange}
                type={'text'}
                placeholder={'Имя'}
                icon='EditIcon'
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
                icon='EditIcon'
                extraClass='mb-2'
              />
            </div>
          </form>
        ) : (
          <Outlet />
        )}
      </div>
    </main>
  );
}
