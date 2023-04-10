import React from 'react';

import stylesDetails from './OrderDetails.module.css';

import IconDone from '../../images/done.svg';

function OrderDetails() {
  return (
    <div className={stylesDetails.wrapper}>
      <div className={stylesDetails.header}>
        <div className={stylesDetails.number}>034536</div>
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
