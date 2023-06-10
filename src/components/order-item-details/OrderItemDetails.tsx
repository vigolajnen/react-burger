import React, { FC, useEffect } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesContent from './OrderItemDetails.module.css';
import { FeedOrder } from '../../services/types/live-orders';
import { useDispatch, useSelector } from '../../hooks';
import { TIngredient } from '../../utils/types';
import classNames from 'classnames';
import { loadIngredients } from '../../services/actions/menu';

type Props = {
  item: {
    number: number;
    title: string;
    name: string;
    status: string;
    image_min: string;
  };
};

interface IOrderItemDetails {
  order: FeedOrder;
}

const OrderItemDetails: FC<IOrderItemDetails> = ({ order }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const orderIngredients = order.ingredients;

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const res = ingredients.filter(
    (item) => !orderIngredients.includes(item._id),
  );

  let count = 1;

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

  const orderStatus = (status: string) => {
    if (status === 'done') {
      return 'Выполнено'
    }
    return status;
  }

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
          {res.map((item: TIngredient) => (
            <li key={item._id}>
              <div className={stylesContent.liPic}>
                <img src={item.image_mobile} alt='pic' />
              </div>
              <h3 className={stylesContent.liTitle}>{item.name}</h3>
              <div className={stylesContent.liPrice}>
                <span>
                  {count} x {item.price}
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
