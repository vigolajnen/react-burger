import React, { FC, useEffect } from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from '../../hooks';
import { getCookie } from '../../services/utils';
import { WS_URL } from '../../utils/constants';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';

import { FeedList } from '../../components/feed-list/FeedList';
import { Loader } from '../../components/loader/Loader';

// css
import styles from './orders.module.css';

const OrdersPage: FC = () => {
  const dispatch = useDispatch();
  const accessToken = getCookie('token');
  const { wsConnected } = useSelector((store) => store.feedList);

  useEffect(() => {
    if (!!accessToken) {
      dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`));
    }

    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, accessToken]);

  const orders = useSelector((store) => store.feedList.orders);

  return (
    <div className={styles.contentOrder}>
      <div className={classNames('custom-scroll', `${styles.items}`)}>
        {wsConnected ? (
          orders && orders.length > 0 ? (
            <FeedList orders={orders} />
          ) : (
            'Заказов нет'
          )
        ) : (
          // 'Загрузка ...'
          <Loader />
        )}
      </div>
    </div>
  );
};

export { OrdersPage };
