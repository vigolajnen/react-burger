import React, { FC } from 'react';
import OrderItem from '../order-item/OrderItem';
import { FeedOrder } from '../../services/types/live-orders';
import OrderFeedItem from '../orderFeedItem/orderFeedItem';
import { useLocation } from 'react-router-dom';
import { getCookie } from '../../services/utils';

interface IFeedList {
  orders: Array<FeedOrder> | any;
}

export const FeedList: FC<IFeedList> = ({ orders }) => {
  const location = useLocation();
  const orderUrl = '/profile/orders';
  const feedUrl = '/feed';
  const accessToken = getCookie('token') !== undefined;

  if (
    (location.pathname === feedUrl && !accessToken) ||
    (location.pathname === feedUrl && accessToken)
  ) {
    return orders.length > 0
      ? orders.map((order: FeedOrder) => (
        <OrderFeedItem key={order._id}  order={order} />
        ))
      : 'Заказов нет';
  }

  if (location.pathname === orderUrl && accessToken) {
    return orders.length > 0
      ? orders
          .map((order: FeedOrder) => (
            <OrderItem key={order._id} order={order} />
          ))
          .reverse()
      : 'Заказов нет';
  }
};
