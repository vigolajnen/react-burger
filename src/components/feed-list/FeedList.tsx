import React, { FC } from 'react';
import OrderItem from '../order-item/OrderItem';
import { FeedOrder } from '../../services/types/live-orders';
import { useSelector } from '../../hooks';
import OrderFeedItem from '../orderFeedItem/orderFeedItem';
import { useLocation } from 'react-router-dom';

interface IFeedList {
  orders?: Array<FeedOrder> | any;
}

export const FeedList: FC<IFeedList> = ({ orders }) => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth);
  const orderUrl = '/profile/orders';
  const feedUrl = '/feed';

  if (isAuth) {
    if (location.pathname === orderUrl) {
      return orders
        ?.map((order: FeedOrder) => <OrderItem key={order._id} order={order} />)
        .reverse();
    } else if (location.pathname === feedUrl) {
      return orders?.map((order: FeedOrder) => (
        <OrderFeedItem key={order._id} order={order} />
      ));
    }
  } else {
    return orders?.map((order: FeedOrder) => (
      <OrderFeedItem key={order._id} order={order} />
    ));
  }
};
