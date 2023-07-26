import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { FeedOrder } from '../../services/types/live-orders';
import { getCookie } from '../../services/utils';

import OrderItem from '../order-item/OrderItem';
import OrderFeedItem from '../orderFeedItem/orderFeedItem';
import {
  URL_FEED,
  URL_PROFILE,
  URL_PROFILE_ORDERS,
} from '../../utils/constants';

interface IFeedList {
  orders: Array<FeedOrder> | any;
}

export const FeedList: FC<IFeedList> = ({ orders }) => {
  const location = useLocation();
  const orderUrl = `${URL_PROFILE}/${URL_PROFILE_ORDERS}`;
  const feedUrl = `${URL_FEED}`;
  const accessToken = getCookie('token') !== undefined;

  if (
    (location.pathname === feedUrl && !accessToken) ||
    (location.pathname === feedUrl && accessToken)
  ) {
    return orders.length > 0
      ? orders.map((order: FeedOrder) => (
          <OrderFeedItem key={order._id} order={order} />
        )).reverse()
      : 'Заказов нет';
  }

  if (location.pathname === orderUrl && accessToken) {
    return orders.length > 0
      ? orders
          .map((order: FeedOrder) => (
            <OrderItem key={order._id} order={order} />
          )).reverse()
      : 'Заказов нет';
  }
};
