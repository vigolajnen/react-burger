import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesItem from './IngredientItem.module.css';

import { useDrag } from "react-dnd";

const IngredientItem = ({ item, handleClick }) => {
  const count = 1;

  const [{isDrag}, dragRef] = useDrag({
    type: "animal",
    item: crypto.randomUUID(),
    collect: monitor => ({
      isDrag: monitor.isDragging()
  })
});

  return (
    !isDrag && <div
      className={stylesItem.item}
      data-id={item._id}
      data-value={item.type}
      onClick={handleClick}
      ref={dragRef}
      board='default'
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

IngredientItem.propTypes = {
  item: ingredientType,
  handleClick: PropTypes.func.isRequired,
};

export default IngredientItem;
