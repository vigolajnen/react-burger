import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from '../../hooks';
import { WS_URL } from '../../utils/constants';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';

import styles from './orders.module.css';
import { FeedList } from '../../components/feed-list/FeedList';
import { useLocation } from 'react-router-dom';

export function OrdersPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders } = useSelector((store) => store.feedList);
  const token = useSelector((state) => state.user.token)?.split('Bearer ')[1];

  const activeLink = location.pathname.substring(1);

  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_URL}?token=${token}`));

    if (activeLink === 'profile/orders') {
      dispatch(wsConnectionStart(`${WS_URL}?token=${token}`));
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.contentOrder}>
      <div className={classNames('custom-scroll', `${styles.items}`)}>
        {!orders && 'Загрузка ...'}
        {orders && token ? (
          <FeedList orders={orders} />
        ) : (
          <h1>История заказов пуста</h1>
        )}
      </div>
    </div>
  );
}
