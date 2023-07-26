import React, { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

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
import {
  URL_ANY,
  URL_FEED,
  URL_FORGOT_PASSWORD,
  URL_INGREDIENTS,
  URL_LOGIN,
  URL_PROFILE,
  URL_PROFILE_ORDERS,
  URL_RESET_PASSWORD,
  URL_ROOT,
} from '../../utils/constants';

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
      <Routes location={background}>
        <Route path={URL_ROOT} element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route
            path={URL_PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route path={URL_PROFILE_ORDERS} element={<OrdersPage />} />
          </Route>
          <Route
            path={URL_LOGIN}
            element={
              <ProtectedRoute anonymous>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='register'
            element={!isAuth ? <RegisterPage /> : <Navigate to={URL_ROOT} />}
          />

          <Route
            path={URL_FORGOT_PASSWORD}
            element={
              <ProtectedRoute anonymous>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={URL_RESET_PASSWORD}
            element={
              <ProtectedRoute anonymous>
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />

          <Route path={URL_FEED} element={<FeedPage />} />
          <Route path={URL_ANY} element={<NotFoundPage />} />
          <Route path={`${URL_INGREDIENTS}/:id`} element={<IngredientPage />} />
          <Route path={`${URL_FEED}/:id`} element={<OrderFeedPage />} />

          <Route
            path={`${URL_PROFILE}/${URL_PROFILE_ORDERS}/:id`}
            element={
              <ProtectedRoute>
                <OrderPage isAuth={isAuth} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      {location.state?.bgIngredient && (
        <Routes>
          <Route
            path={`${URL_INGREDIENTS}/:id`}
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
            path={`${URL_FEED}/:id`}
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
            path={`${URL_PROFILE}/${URL_PROFILE_ORDERS}/:id`}
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
