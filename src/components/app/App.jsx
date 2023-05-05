import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LayoutPage } from '../layout-page/LayoutPage';

import { HomePage } from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { NotFoundPage } from '../../pages/not-found';
import { ModalPage } from '../../pages/modal';
import { ProtectedRouteElement } from '../protected-route';
import { ProvideAuth } from '../../services/auth';

import appStyles from './App.module.css';

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <div className={appStyles.app}>
          <Routes>
            <Route path='/' element={<LayoutPage />}>
              <Route index element={<HomePage />} />
              <Route
                path='profile'
                element={<ProtectedRouteElement element={<ProfilePage />} />}
              />
              <Route path='login' element={<LoginPage />} />
              <Route path='register' element={<RegisterPage />} />
              <Route path='forgot-password' element={<ForgotPasswordPage />} />
              <Route path='reset-password' element={<ResetPasswordPage />} />
              <Route path='*' element={<NotFoundPage />} />
              <Route path='ingredients/:id' element={<ModalPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
