import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { LayoutPage } from '../layout-page/LayoutPage';

import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { ModalPage } from '../../pages/modal/modal';
import { OrdersPage } from '../../pages/orders/orders';
import { FeedPage } from '../../pages/feed/feed';
import ProtectedRoute from '../protected-route/protected-route';
import { useSelector, useDispatch } from '../../hooks';

import { getUser } from '../../services/actions/user';
import appStyles from './App.module.css';
import { ModalOrderPage } from '../../pages/modal/modalOrder';

function App() {
  const dispatch = useDispatch();

  if (window.location.pathname === '/reset-password') {
    window.location.href = '/forgot-password';
  }

  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (isAuth) {
      const user: any = getUser();
      dispatch(user) as unknown as Promise<unknown>;
    }
  }, [dispatch, isAuth]);

  return (
    <BrowserRouter>
      <div className={appStyles.app}>
        <Routes>
          <Route path='/' element={<LayoutPage />}>
            <Route index element={<HomePage />} />

            <Route
              path='profile/*'
              element={
                <ProtectedRoute authUser={isAuth}>
                  <OrdersPage />
                  {/* <ProfilePage>
                    <Route path='orders' element={<OrdersPage />} />
                  </ProfilePage> */}
                </ProtectedRoute>
              }
            />

            <Route
              path='profile'
              element={
                <ProtectedRoute authUser={isAuth}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='profile'
              element={
                <ProtectedRoute authUser={isAuth}>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />

            <Route path='profile' element={<ProfilePage />}>
              <Route path='orders' element={<OrdersPage />} />
            </Route>


            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='feed' element={<FeedPage />} />
            <Route path='forgot-password' element={<ForgotPasswordPage />} />
            <Route path='reset-password' element={<ResetPasswordPage />} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path='ingredients/:id' element={<ModalPage />} />

            <Route path='feed/:id' element={<ModalOrderPage />} />
            <Route path='orders/:id' element={<ModalOrderPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
