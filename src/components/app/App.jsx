import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ForgotPasswordCodePage } from '../../pages/forgot-password-2';

import appStyles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={appStyles.app}>
        <header className={appStyles.header}>
          <div className={appStyles.container}>
            <Link to='/' className={appStyles.link}>
              <BurgerIcon type='primary' />
              <span className={appStyles.linkText}>Конструктор</span>
            </Link>

            <a href='#' className={appStyles.linkSecondary}>
              <ListIcon type='secondary' />
              <span className={appStyles.linkText}>Лента заказов</span>
            </a>

            <div className={appStyles.logo}>
              <Logo />
            </div>

            <Link to='/login' className={appStyles.linkRight}>
              <ProfileIcon type='secondary' />
              <span className={appStyles.linkText}>Личный кабинет</span>
            </Link>
          </div>
        </header>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/forgot-password-2' element={<ForgotPasswordCodePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
