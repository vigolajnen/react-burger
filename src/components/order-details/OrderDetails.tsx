import React from 'react';

import { Loader } from '../loader/Loader';
import IconDone from '../../images/done.svg';

// css
import stylesDetails from './OrderDetails.module.css';

type Props = {
  orderId: number;
};

function OrderDetails({ orderId }: Props) {
  return (
    <div className={stylesDetails.wrapper}>
      <div className={stylesDetails.header}>
        {orderId === undefined ? (
          // 'загрузка...'
          <Loader />
        ) : (
          <div className={stylesDetails.number}>{orderId}</div>
        )}

        <div>идентификатор заказа</div>
      </div>
      <img className={stylesDetails.pic} src={IconDone} alt='icon done' />
      <div className={stylesDetails.footer}>
        <div>Ваш заказ начали готовить</div>
        <div>Дождитесь готовности на орбитальной станции</div>
      </div>
    </div>
  );
}

export default OrderDetails;
