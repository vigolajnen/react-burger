import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderItem.module.css';
import { FeedOrder } from '../../services/types/live-orders';
import { useDispatch, useSelector } from '../../hooks';
import { TIngredient } from '../../utils/types';
import { loadIngredients } from '../../services/actions/menu';

interface IOrderItem {
  order: FeedOrder;
}

const OrderItem: FC<IOrderItem> = ({ order }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const orderIngredients = order.ingredients;

  useEffect(() => {
    dispatch(loadIngredients())
  }, [dispatch]);

  const res = ingredients.filter(
    (item) => !orderIngredients.includes(item._id),
  );

  const countProduct = () => {
    let count = 0;
    if (res.length > 6) {
      count = res.length - 6;
    }
    return count;
  };

  const resPrice = res.reduce((a: any, b: any) => a + b.price, 0);

  const dayFormat = (orderDay: string) => {
    const day = '';
    const today = new Date().toISOString().slice(0, 10);
    const time = orderDay.slice(11, 16);

    if (today === orderDay.slice(0, 10)) {
      return 'Сегодня' + ', ' + time;
    }
    return day + ', ' + time;
  };


  return (
    <Link
      to={isAuth ? `/profile/orders/${order._id}` : `/feed/${order._id}`}
      className={styles.wrapper}
    >
      <div className={styles.header}>
        <div className={styles.number}>#{order.number}</div>
        <div className={styles.time}>{dayFormat(order.createdAt)}</div>
      </div>
      <h1 className={styles.title}>{order.name}</h1>
      <div className={styles.body}>
        <div className={styles.infoList}>
          <ul className={styles.list}>
            {res.map((item: TIngredient) => (
              <li key={item._id}>
                <div className={styles.liInner}>
                  <img src={item.image_mobile} alt='pic' />
                </div>
              </li>
            ))}
          </ul>
          {res.length > 6 && (
            <div className={styles.listCount}>+{countProduct()}</div>
          )}
        </div>

        <div className={styles.price}>
          <span>{resPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
