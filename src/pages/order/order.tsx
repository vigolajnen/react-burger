import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '../../hooks';

import { getCookie } from '../../services/utils';
import { WS_URL } from '../../utils/constants';
import {
  wsConnectionClosed,
  wsConnectionStart,
} from '../../services/actions/wsActions';
import OrderItemDetails from '../../components/order-item-details/OrderItemDetails';

import { TOrder } from '../../utils/types';

// css
import styles from './order.module.css';

type Props = {
  isAuth?: Boolean;
};

const OrderPage: FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('token');

    dispatch(wsConnectionStart(`${WS_URL}?token=${accessToken}`));

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
          <OrderItemDetails />
        </div>
      )}
    </>
  );
};

export default OrderPage;
