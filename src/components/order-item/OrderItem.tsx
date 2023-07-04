import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderItem.module.css';
import { FeedOrder } from '../../services/types/live-orders';
import { useSelector } from '../../hooks';
import { TIngredient } from '../../utils/types';
import { useLocation } from 'react-router-dom';
import {
  allOrderIngredients,
  countProduct,
  dayFormat,
  orderIngredients,
  orderStatus,
  resPrice,
} from '../../utils/orders';
import { motion } from 'framer-motion';

interface IOrderItem {
  order: FeedOrder;
}

const OrderItem: FC<IOrderItem> = ({ order }) => {
  const { wsConnected } = useSelector((store) => store.feedList);

  const orderIngredientsMax = 6;
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const items = orderIngredients(order, ingredients);
  const orderIngredientsArr = allOrderIngredients(items);

  return (
    order && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Link
          to={`/profile/orders/${order._id}`}
          className={styles.wrapper}
          state={{ bgProfileFeed: location }}
        >
          <div className={styles.header}>
            <div className={styles.number}>#{order.number}</div>
            <div className={styles.time}>{dayFormat(order.createdAt)}</div>
          </div>
          <div className={styles.titleAndStatus}>
            <h3 className={styles.title}>{order.name}</h3>

            <div className={styles.status}>{orderStatus(order.status)}</div>
          </div>
          <div className={styles.body}>
            <div className={styles.infoList}>
              <ul className={styles.list}>
                {wsConnected &&
                  orderIngredientsArr.map((item: TIngredient, index) => (
                    <li key={index}>
                      <div className={styles.liInner}>
                        <img src={item?.image_mobile} alt='pic' />
                      </div>
                    </li>
                  ))}
              </ul>
              {wsConnected &&
                orderIngredientsArr.length > orderIngredientsMax && (
                  <div className={styles.listCount}>
                    +{countProduct(orderIngredientsArr, orderIngredientsMax)}
                  </div>
                )}
            </div>

            <div className={styles.price}>
              <span>{resPrice(orderIngredientsArr)}</span>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </Link>
      </motion.div>
    )
  );
};

export default OrderItem;
