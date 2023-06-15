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
import { getCookie } from '../../services/utils';

export function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.feedList.orders);
  const accessToken = getCookie('token');

  useEffect(() => {
    dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.contentOrder}>
      <div className={classNames('custom-scroll', `${styles.items}`)}>
        {orders ? (
          orders.length > 0 ? (
            <FeedList orders={orders} />
          ) : (
            ' Загрузка ...'
          )
        ) : (
          'Заказов нет'
        )}
      </div>
    </div>
  );
}
