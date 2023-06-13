import React, { FC } from 'react';
import OrderItem from '../order-item/OrderItem';
import { FeedOrder } from '../../services/types/live-orders';


interface IFeedList {
  orders: Array<FeedOrder> | any;
}

export const FeedList: FC<IFeedList> = ({ orders }) => {
  
  return orders.map((order: FeedOrder) => <OrderItem key={order._id} order={order} />);
};
