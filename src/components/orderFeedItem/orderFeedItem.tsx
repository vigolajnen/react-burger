import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { motion } from 'framer-motion';

import { FeedOrder } from '../../services/types/live-orders';
import { useSelector } from '../../hooks';

import {
  allOrderIngredients,
  countProduct,
  dayFormat,
  orderIngredients,
  resPrice,
} from '../../utils/orders';
import { TIngredientOrder } from '../../utils/types';

// css
import styles from './OrderFeedItem.module.css';
import { URL_FEED } from '../../utils/constants';

interface IOrderItem {
  order: FeedOrder;
}

const OrderFeedItem: FC<IOrderItem> = ({ order }) => {
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
          to={`${URL_FEED}/${order._id}`}
          className={styles.wrapper}
          state={{ bgFeedList: location }}
        >
          <div className={styles.header}>
            <div className={styles.number}>#{order.number}</div>
            <div className={styles.time}>{dayFormat(order.createdAt)}</div>
          </div>
          <div className={styles.titleAndStatus}>
            <h3 className={styles.title}>{order.name}</h3>
          </div>
          <div className={styles.body}>
            <div className={styles.infoList}>
              <ul className={styles.list}>
                {wsConnected &&
                  orderIngredientsArr.length > 0 &&
                  orderIngredientsArr.map((item: TIngredientOrder, index) =>
                    item !== undefined ? (
                      <li key={index}>
                        <div className={styles.liInner}>
                          <img src={item.image_mobile} alt='pic' />
                        </div>
                      </li>
                    ) : (
                      <li key={index}>
                        <div className={styles.liInner}>?</div>
                      </li>
                    ),
                  )}
              </ul>
              {orderIngredientsArr.length > orderIngredientsMax && (
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

export default OrderFeedItem;
