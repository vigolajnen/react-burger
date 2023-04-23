import React from 'react';
import PropTypes from 'prop-types';
import IconDone from '../../images/done.svg';
import stylesDetails from './OrderDetails.module.css';

function OrderDetails({ orderId }) {
  return (
    <div className={stylesDetails.wrapper}>
      <div className={stylesDetails.header}>
        <div className={stylesDetails.number}>{orderId}</div>
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

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired,
};

export default OrderDetails;
