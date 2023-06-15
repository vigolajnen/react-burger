import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

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
import { loadIngredients } from '../../services/actions/menu';
import { updateUserRequest } from '../../services/api-auth';
import { getCookie } from '../../services/utils';
import Modal from '../modal/Modal';
import ModalBg from '../modal/ModalBg';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import OrderItemDetails from '../order-item-details/OrderItemDetails';
import IngredientPage from '../../pages/ingredient/Ingredient';
import OrderPage from '../../pages/order/order';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);
  const accessToken = getCookie('token');

  useEffect(() => {
    dispatch(loadIngredients());

    if (accessToken !== 'undefined') {
      dispatch(getUser());
    }
  }, [dispatch, accessToken]);

  const background =
    location.state?.bgIngredient ||
    location.state?.bgFeedList ||
    location.state?.bgProfileFeed ||
    location;

  return (
    <div className={appStyles.app}>
      <Routes location={background}>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route
            path='profile'
            element={
              <ProtectedRoute authUser={isAuth}>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route
              path='orders'
              element={
                <ProtectedRoute authUser={isAuth}>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            {/* 
            <Route
              path='orders/:id'
              element={
                <ProtectedRoute authUser={isAuth}>
                  <ModalOrderPage />
                </ProtectedRoute>
              }
            /> */}
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='feed' element={<FeedPage />} />

          <Route path='forgot-password' element={<ForgotPasswordPage />} />
          <Route path='reset-password' element={<ResetPasswordPage />} />
          <Route path='*' element={<NotFoundPage />} />

          <Route path='ingredients/:id' element={<IngredientPage />} />
          <Route path='feed/:id' element={<OrderPage isAuth={!isAuth} />} />
          <Route
            path='profile/orders/:id'
            element={<OrderPage isAuth={isAuth} />}
          />
        </Route>
      </Routes>

      {location.state?.bgIngredient && (
        <Routes>
          <Route
            path='ingredients/:id'
            element={
              <ModalBg title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </ModalBg>
            }
          />
        </Routes>
      )}

      {location.state?.bgFeedList && (
        <Routes>
          <Route
            path='feed/:id'
            element={
              <ModalBg onClose={() => navigate(-1)}>
                <OrderItemDetails />
              </ModalBg>
            }
          />
        </Routes>
      )}

      {location.state?.bgProfileFeed && (
        <Routes>
          <Route
            path='profile/orders/:id'
            element={
              <ModalBg onClose={() => navigate(-1)}>
                <OrderItemDetails />
              </ModalBg>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
