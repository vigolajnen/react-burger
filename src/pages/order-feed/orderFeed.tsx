import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '../../hooks';

import { WS_URL_ALL } from '../../utils/constants';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';

import OrderFeedItemDetails from '../../components/order-feed-item-details/OrderFeedItemDetails';

import { TOrder } from '../../utils/types';

// css
import styles from './orderFeed.module.css';

const OrderFeedPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart(WS_URL_ALL));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  const orders = useSelector((store) => store.feedList.orders);
  const { id } = useParams();
  const order = orders.find((item: TOrder) => item._id === id);

  return (
    <>
      {order && (
        <div className={styles.wrapper}>
          <OrderFeedItemDetails />
        </div>
      )}
    </>
  );
};

export default OrderFeedPage;
