import React from 'react';
// import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesItem from './IngredientItem.module.css';

const IngredientItem = ({ item, handleClick }) => {
  const count = 0;

  return (
    <div
      className={stylesItem.item}
      data-id={item._id}
      data-value={item.type}
      onClick={handleClick}
    >
      {count !== 0 && <Counter count={count} size='default' extraClass='m-1' />}

      <img className={stylesItem.pic} src={item.image} alt={item.name} />
      <div className={stylesItem.price}>
        <span>{item.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className={stylesItem.title}>{item.name}</h3>
    </div>
  );
};

IngredientItem.propTypes = ingredientType;

export default IngredientItem;
