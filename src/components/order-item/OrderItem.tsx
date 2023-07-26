import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { motion } from 'framer-motion';

import { useSelector } from '../../hooks';
import { FeedOrder } from '../../services/types/live-orders';

import {
  allOrderIngredients,
  countProduct,
  dayFormat,
  orderIngredients,
  orderStatus,
  resPrice,
} from '../../utils/orders';
import { TIngredient } from '../../utils/types';

// css
import styles from './OrderItem.module.css';

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
      initial={{ opacity: 0, marginBottom: '16px', border: '2px solid transparent', borderRadius: '40px', maskComposite: 'exclude' }}
      animate={{ opacity: 1, marginBottom: '16px' }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 0.97, background: 'linear-gradient(63.18deg, #801ab3 0%, #4c4cff 100%) border-box' }}
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
