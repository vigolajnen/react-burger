import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../hooks';

import { dayFormat } from '../../utils/orders';

import { TIngredient, TIngredientCount } from '../../utils/types';

// css
import stylesContent from './OrderItemDetails.module.css';

const OrderItemDetails: FC = () => {
  const orders = useSelector((store) => store.feedList.orders);
  const { id } = useParams();
  const order = orders?.find((item) => item?._id === id);
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const orderIngredients = () => {
    const items: Array<TIngredient> = [];
    order?.ingredients.forEach((itemId: any) => {
      ingredients.filter((item: TIngredient) => {
        if (item._id === itemId) {
          items.push(item);
        }
      });
    });

    return items;
  };

  const items = orderIngredients();
  let orderIngredientsArr: Array<TIngredient> = [];
  const orderBun = items.filter((el) => el.type === 'bun');
  const orderIngs = items.filter((el) => el.type !== 'bun');
  if (orderBun.length > 0) {
    orderIngredientsArr = [...orderIngs, orderBun[0], orderBun[0]];
  }

  const countItems: { [key: string]: number } = {}; // здесь будет храниться промежуточный результат
  for (const el of orderIngredientsArr) {
    countItems[el._id] = countItems[el._id] ? countItems[el._id] + 1 : 1;
  }

  const countItemsArr = Object.entries(countItems).map((entry) => ({
    _id: entry[0],
    count: entry[1],
  }));

  const withoutDuplicatesArr = orderIngredientsArr.filter(
    (el, index, items) => items.indexOf(el) === index,
  );

  withoutDuplicatesArr.map((el: TIngredientCount) => {
    countItemsArr.map((item) => {
      if (el._id === item._id) {
        el.count = item.count;
      }
    });
  });

  const resPrice: number = orderIngredientsArr?.reduce(
    (a: number, b: TIngredient) => a + b.price,
    0,
  );

  const orderStatus = (status: string | undefined) => {
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
        <div>#{order?.number}</div>
      </div>
      <div className={stylesContent.titleAndStatus}>
        <h3 className={stylesContent.title}>{order?.name}</h3>
        <div className={stylesContent.status}>{orderStatus(order?.status)}</div>
      </div>

      <h3>Состав:</h3>
      <div className={classNames('custom-scroll', `${stylesContent.items}`)}>
        <ul className={stylesContent.list}>
          {withoutDuplicatesArr.map((item: any) => (
            <li key={item._id} data-id={item._id}>
              <div className={stylesContent.liPic}>
                <img src={item.image_mobile} alt='pic' />
              </div>
              <h3 className={stylesContent.liTitle}>{item.name}</h3>
              <div className={stylesContent.liPrice}>
                <span>
                  {item.count} x {item.price}
                </span>
                <CurrencyIcon type='primary' />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={stylesContent.footer}>
        <div className={stylesContent.time}>
          {order && dayFormat(order.createdAt)}
        </div>
        <div className={stylesContent.price}>
          <span>{resPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  );
};

export default OrderItemDetails;
