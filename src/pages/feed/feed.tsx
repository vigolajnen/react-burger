import React, { FC, useEffect } from 'react';
import styles from './feed.module.css';

import classNames from 'classnames';
import { useDispatch, useSelector } from '../../hooks';
import { WS_URL_ALL } from '../../utils/constants';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';

import { FeedList } from '../../components/feed-list/FeedList';
import { useLocation } from 'react-router-dom';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders, total, totalToday } = useSelector((store) => store.feedList);

  const ordersDone = orders.filter((item) => item.status === 'done');
  const ordersNotDone = orders.filter((item) => item.status !== 'done');
  const ordersDoneMax = ordersDone.slice(0, 20);
  const ordersNotDoneMax = ordersNotDone.slice(0, 20);

  const isAuth = useSelector((state) => state.user.isAuth);
  const activeLink = location.pathname.substring(1);

  useEffect(() => {
    dispatch(wsConnectionStart(WS_URL_ALL));
    if (isAuth && activeLink === 'feed') {
      dispatch(wsConnectionStart(WS_URL_ALL));
    }
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch, wsConnectionClosed]);

  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.title}>Лента заказов</h1>
        <div className={classNames('custom-scroll', `${styles.items}`)}>
          {orders.length > 0 ? <FeedList orders={orders} /> : 'Загрузка ...'}
        </div>
      </div>
      <div>
        <div className={styles.infoOrders}>
          <div>
            <h2 className={styles.infoOrdersTitle}>Готовы:</h2>
            <div className={styles.ListCol}>
              <ul className={styles.infoOrdersListReady}>
                {ordersDoneMax.slice(0, 9).map((item) => (
                  <li key={item._id}>{item.number}</li>
                ))}
              </ul>
              <ul className={styles.infoOrdersListReady}>
                {ordersDoneMax.slice(10, 19).map((item) => (
                  <li key={item._id}>{item.number}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className={styles.infoOrdersTitle}>В работе:</h2>
            <div className={styles.ListCol}>
              <ul className={styles.infoOrdersList}>
                {ordersNotDoneMax.slice(0, 9).map((item) => (
                  <li key={item._id}>{item.number}</li>
                ))}
              </ul>
              <ul className={styles.infoOrdersList}>
                {ordersNotDoneMax.slice(10, 19).map((item) => (
                  <li key={item._id}>{item.number}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.infoOrdersTitle}>Выполнено за все время:</h3>
          <div className={styles.infoOrdersCount}>{total}</div>
        </div>
        <div>
          <h3 className={styles.infoOrdersTitle}>Выполнено за сегодня:</h3>
          <div className={styles.infoOrdersCount}>{totalToday}</div>
        </div>
      </div>
    </main>
  );
};
