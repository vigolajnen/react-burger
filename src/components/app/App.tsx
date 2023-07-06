import React, { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// actions
import { getUser } from '../../services/actions/user';
import { loadIngredients } from '../../services/actions/menu';

import { LayoutPage } from '../layout-page/LayoutPage';
import ProtectedRoute from '../protected-route/protected-route';
import { useSelector, useDispatch } from '../../hooks';
import { getCookie } from '../../services/utils';
import Modal from '../modal/Modal';

// pages
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { OrdersPage } from '../../pages/orders/orders';
import { FeedPage } from '../../pages/feed/feed';
import IngredientPage from '../../pages/ingredient/Ingredient';
import OrderPage from '../../pages/order/order';
import OrderFeedPage from '../../pages/order-feed/orderFeed';

import IngredientDetails from '../ingredient-details/IngredientDetails';
import OrderItemDetails from '../order-item-details/OrderItemDetails';
import OrderFeedItemDetails from '../order-feed-item-details/OrderFeedItemDetails';

// css
import appStyles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    dispatch(loadIngredients());
    getCookie('token') !== undefined && dispatch(getUser());
  }, [dispatch]);

  const background =
    location.state?.bgIngredient ||
    location.state?.bgFeedList ||
    location.state?.bgProfileFeed ||
    location;

  return (
    <div className={appStyles.app}>
      <AnimatePresence>
        <Routes location={background}>
          <Route path='/' element={<LayoutPage />}>
            <Route index element={<HomePage />} />
            <Route
              path='profile'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              <Route path='orders' element={<OrdersPage />} />
            </Route>
            <Route
              path='login'
              element={
                <ProtectedRoute anonymous>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='register'
              element={!isAuth ? <RegisterPage /> : <Navigate to={'/'} />}
            />

            <Route path='feed' element={<FeedPage />} />

            <Route
              path='forgot-password'
              element={
                <ProtectedRoute anonymous>
                  <ForgotPasswordPage />
                </ProtectedRoute>
              }
            />

            <Route
              path='reset-password'
              element={
                <ProtectedRoute anonymous>
                  <ResetPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFoundPage />} />

            <Route path='ingredients/:id' element={<IngredientPage />} />
            <Route path='feed/:id' element={<OrderFeedPage />} />

            <Route
              path='profile/orders/:id'
              element={
                <ProtectedRoute>
                  <OrderPage isAuth={isAuth} />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>

      {location.state?.bgIngredient && (
        <Routes>
          <Route
            path='ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {location.state?.bgFeedList && (
        <Routes>
          <Route
            path='feed/:id'
            element={
              <Modal onClose={() => navigate(-1)}>
                <OrderFeedItemDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {location.state?.bgProfileFeed && (
        <Routes>
          <Route
            path='profile/orders/:id'
            element={
              <ProtectedRoute>
                <Modal onClose={() => navigate(-1)}>
                  <OrderItemDetails />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
