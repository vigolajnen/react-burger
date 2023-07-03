import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderFeedItem.module.css';
import { FeedOrder } from '../../services/types/live-orders';
import { useSelector } from '../../hooks';
import { TIngredientOrder } from '../../utils/types';
import { useLocation } from 'react-router-dom';
import {
  allOrderIngredients,
  countProduct,
  dayFormat,
  orderIngredients,
  resPrice,
} from '../../utils/orders';

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
      <Link
        to={`/feed/${order._id}`}
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
                    'Загрузка...'
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
    )
  );
};

export default OrderFeedItem;
