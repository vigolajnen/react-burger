import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import { TOrder } from '../../utils/types';


import { WS_URL_ALL } from '../../utils/constants';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';
import OrderItemDetails from '../../components/order-item-details/OrderItemDetails';
import styles from './orderFeed.module.css';
import OrderFeedItemDetails from '../../components/order-feed-item-details/OrderFeedItemDetails';


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
