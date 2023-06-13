import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesContent from './OrderItemDetails.module.css';
import { FeedOrder } from '../../services/types/live-orders';
import { useSelector } from '../../hooks';
import { TIngredient } from '../../utils/types';
import classNames from 'classnames';
import { dayFormat } from '../order-item/OrderItem';
import { useParams } from 'react-router-dom';

// interface IOrderItemDetails {
//   order: FeedOrder;
// }

const OrderItemDetails: FC = () => {
  const orders = useSelector((store) => store.orders.orders);
  const { id } = useParams();
  const order = orders.find((item: any) => item?._id === id);

  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const orderIngredients = order.ingredients;
  const orderIngredientsList = ingredients.filter(
    (item) => !orderIngredients.includes(item._id),
  );

  function counter(ingredient: TIngredient) {
    let counter = 0;
    ingredients.forEach((el) => {
      if (el._id === ingredient._id) {
        counter += 1;
      }
    });
    return counter;
  }

  const resPrice: number = orderIngredientsList.reduce(
    (a: number, b: TIngredient) => a + b.price,
    0,
  );

  const orderStatus = (status: string) => {
    if (status === 'done') {
      return 'Выполнено';
    } else if ((status = 'created')) {
      return 'Создан';
    }
    return 'Готовится';
  };

  return (
    <section className={stylesContent.wrapper}>
      <div className={stylesContent.header}>
        <div>#{order.number}</div>
      </div>
      <div className={stylesContent.titleAndStatus}>
        <h3 className={stylesContent.title}>{order.name}</h3>
        <div className={stylesContent.status}>{orderStatus(order.status)}</div>
      </div>

      <h3>Состав:</h3>
      <div className={classNames('custom-scroll', `${stylesContent.items}`)}>
        <ul className={stylesContent.list}>
          {orderIngredientsList.map((item: TIngredient) => (
            <li key={item._id}>
              <div className={stylesContent.liPic}>
                <img src={item.image_mobile} alt='pic' />
              </div>
              <h3 className={stylesContent.liTitle}>{item.name}</h3>
              <div className={stylesContent.liPrice}>
                <span>
                  {counter(item)} x {item.price}
                </span>
                <CurrencyIcon type='primary' />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={stylesContent.footer}>
        <div className={stylesContent.time}>{dayFormat(order.createdAt)}</div>
        <div className={stylesContent.price}>
          <span>{resPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  );
};

export default OrderItemDetails;
