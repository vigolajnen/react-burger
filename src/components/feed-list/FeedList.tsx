import React, { FC } from 'react';
import OrderItem from '../order-item/OrderItem';
import { FeedOrder } from '../../services/types/live-orders';
import OrderFeedItem from '../orderFeedItem/orderFeedItem';
import { useLocation } from 'react-router-dom';
import { getCookie } from '../../services/utils';
import { useSelector } from '../../hooks';

interface IFeedList {
  orders: Array<FeedOrder> | any;
}

export const FeedList: FC<IFeedList> = ({ orders }) => {
  const location = useLocation();
  const orderUrl = '/profile/orders';
  const feedUrl = '/feed';
  const accessToken = !!getCookie('token');
  const { user } = useSelector((store) => store.user);

  if (accessToken && !!user) {
    if (location.pathname === orderUrl) {
      return orders.length > 0
        ? orders
            .map((order: FeedOrder) => (
              <OrderItem key={order._id} order={order} />
            ))
            .reverse()
        : 'Заказов нет';
    } else if (location.pathname === feedUrl) {
      return orders.length > 0
        ? orders.map((order: FeedOrder) => (
            <OrderFeedItem key={order._id} order={order} />
          ))
        : 'Заказов нет';
    }
  } else {
    return orders.length > 0
      ? orders.map((order: FeedOrder) => (
          <OrderFeedItem key={order._id} order={order} />
        ))
      : 'Заказов нет';
  }
};
