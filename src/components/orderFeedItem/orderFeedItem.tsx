import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderFeedItem.module.css';
import { FeedOrder } from '../../services/types/live-orders';
import { useSelector } from '../../hooks';
import { TIngredient, TIngredientOrder } from '../../utils/types';
import { useLocation } from 'react-router-dom';

interface IOrderItem {
  order: FeedOrder;
}

export const dayFormat = (orderDay: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const time = orderDay.slice(11, 16);
  const resCountDay = +today.slice(8, 10) - +orderDay.slice(8, 10);

  if (resCountDay === 0) {
    return `Сегодня, ${time}`;
  } else if (resCountDay === 1) {
    return `${resCountDay} день назад,  ${time}`;
  } else if (resCountDay === 2 || resCountDay === 3 || resCountDay === 4) {
    return `${resCountDay} дня назад,  ${time}`;
  }
  return `${resCountDay} дней назад, ${time}`;
};

const OrderFeedItem: FC<IOrderItem> = ({ order }) => {
  const { wsConnected } = useSelector((store) => store.feedList);

  const orderIngredientsMax = 6;
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const orderIngredients = () => {
    const items: Array<TIngredient> = [];
    order?.ingredients.forEach((itemId) => {
      ingredients.filter((item: TIngredient) => {
        if (item._id === itemId) {
          items.push(item);
        }
      });
    });

    return items;
  };

  const items = orderIngredients();

  const allOrderIngredients = () => {
    const orderBun: TIngredient = items.find((el) => el.type === 'bun')!;
    const orderIngs = items.filter((el) => el.type !== 'bun');
    return [orderBun, orderBun, ...orderIngs];
  };

  const orderIngredientsArr = allOrderIngredients();

  const countProduct = () => {
    let count = 0;
    if (orderIngredientsArr.length > orderIngredientsMax) {
      count = orderIngredientsArr.length - orderIngredientsMax;
    }
    return count;
  };
  
  const resPrice: number = orderIngredientsArr.reduce(
    (a: number, b: TIngredient) => a + (Number(b?.price) || 0),
    0,
  );

  return (
    order &&
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
            {wsConnected && orderIngredientsArr.length > 0 && orderIngredientsArr.map((item: TIngredientOrder, index) => (
             item !== undefined ? <li key={index}>
                <div className={styles.liInner}>
                  <img src={item.image_mobile} alt='pic' />
                </div>
              </li>
                : 'Загрузка...'
              
            ))}
          </ul>
          {orderIngredientsArr.length > orderIngredientsMax && (
            <div className={styles.listCount}>+{countProduct()}</div>
          )}
        </div>

        <div className={styles.price}>
          <span>
            {/* 90 */}
            {resPrice !== undefined ? resPrice : 80}
            {/* {!!order && resPrice !== undefined && resPrice} */}
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  );
};

export default OrderFeedItem;
