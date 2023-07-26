import React, { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { WS_URL_ALL } from '../../utils/constants';
import { useDispatch, useSelector } from '../../hooks';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';

import { FeedList } from '../../components/feed-list/FeedList';
import { Loader } from '../../components/loader/Loader';

// css
import styles from './feed.module.css';

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const { wsConnected } = useSelector((store) => store.feedList);

  useEffect(() => {
    dispatch(wsConnectionStart(WS_URL_ALL));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const { orders, total, totalToday } = useSelector((store) => store.feedList);
  const reversOrders = orders.reverse();
  const ordersDone = orders?.filter((item) => item.status === 'done');
  const ordersNotDone = orders?.filter((item) => item.status !== 'done');
  const ordersDoneMax = ordersDone?.slice(0, -20);
  const ordersNotDoneMax = ordersNotDone?.slice(0, 20);

  return (
    orders && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <main className={styles.main}>
          <div>
            <h1 className={styles.title}>Лента заказов</h1>
            <div className={classNames('custom-scroll', `${styles.items}`)}>
              {wsConnected && orders.length > 0 ? (
                <FeedList orders={orders.reverse()} />
              ) : (
                // 'Загрузка ...'
                <Loader />
              )}
            </div>
          </div>
          <div>
            <div className={styles.infoOrders}>
              <div>
                <h2 className={styles.infoOrdersTitle}>Готовы:</h2>
                <div className={styles.ListCol}>
                  <ul className={styles.infoOrdersListReady}>
                    {wsConnected &&
                      orders &&
                      ordersDoneMax
                        .slice(0, 9)
                        .map((item) => <li key={item._id}>{item.number}</li>)}
                  </ul>
                  <ul className={styles.infoOrdersListReady}>
                    {wsConnected &&
                      orders &&
                      ordersDoneMax
                        .slice(10, 19)
                        .map((item) => <li key={item._id}>{item.number}</li>)}
                  </ul>
                </div>
              </div>
              <div>
                <h2 className={styles.infoOrdersTitle}>В работе:</h2>
                <div className={styles.ListCol}>
                  <ul className={styles.infoOrdersList}>
                    {wsConnected &&
                      orders &&
                      ordersNotDoneMax
                        .slice(0, 9)
                        .map((item) => <li key={item._id}>{item.number}</li>)}
                  </ul>
                  <ul className={styles.infoOrdersList}>
                    {wsConnected &&
                      orders &&
                      ordersNotDoneMax
                        .slice(10, 19)
                        .map((item) => <li key={item._id}>{item.number}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h3 className={styles.infoOrdersTitle}>
                Выполнено за все время:
              </h3>
              <div className={styles.infoOrdersCount}>{total}</div>
            </div>
            <div>
              <h3 className={styles.infoOrdersTitle}>Выполнено за сегодня:</h3>
              <div className={styles.infoOrdersCount}>{totalToday}</div>
            </div>
          </div>
        </main>
      </motion.div>
    )
  );
};
