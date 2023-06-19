import React, { useCallback, useState, ChangeEvent, useEffect } from 'react';
import {
  Input,
  PasswordInput,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from '../../hooks';

import { userLogout } from '../../services/actions/user';

import styles from './profile.module.css';
import { deleteCookie, getCookie } from '../../services/utils';

type PropsActiveLink = {
  isActive: boolean;
};

export function ProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const activeLink = location.pathname.substring(1);
  const user = useSelector((state) => state.user.user);

  const logout = useCallback(async () => {
    dispatch(userLogout(getCookie('refreshToken'))).then(() => {
      deleteCookie('token');
      deleteCookie('refreshToken');
      navigate('/', { replace: true });
    });
  }, [dispatch, navigate, deleteCookie]);

  const [value, setValue] = useState<string>('user');
  const [valueEmail, setValueEmail] = useState<string>('user@email.rr');

  if (user !== null) {
    setTimeout(() => {
      setValue(user.user?.name || user.name);
      setValueEmail(user.user?.email || user.email);
    }, 500);
  }

  // useEffect(() => {
  //   // if (user !== null) {

  //   // }
  //   setTimeout(() => {
  //     setValue(user.user?.name || user.name);
  //     setValueEmail(user.user?.email || user.email);
  //   }, 500);
  // }, [value, valueEmail]);

  const [valuePassword, setValuePassword] = useState<string>('1234567');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  const setActiveLink = ({ isActive }: PropsActiveLink) =>
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
        <button type='button' onClick={logout} className={styles.item}>
          Выход
        </button>
        <div className={styles.text}>
          В этом разделе вы можете изменить свои персональные данные
        </div>
      </aside>

      <div className={styles.content}>
        {activeLink === 'profile' ? (
          <form className={styles.form}>
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
                autoComplete='off'
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
