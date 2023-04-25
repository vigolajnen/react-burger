import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesItem from './IngredientItem.module.css';

import { useDrag } from 'react-dnd';

const IngredientItem = ({ item, id, handleClick, count }) => {
//  item: crypto.randomUUID(),
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: () => {
      return { id };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <div
        className={stylesItem.item}
        id={item._id}
        data-id={item._id}
        data-value={item.type}
        onClick={handleClick}
        ref={dragRef}
        style={{ cursor: 'move' }}
      >
        {count > 0 && (
          <Counter count={count} size='default' extraClass='m-1' />
        )}

        <img className={stylesItem.pic} src={item.image} alt={item.name} />
        <div className={stylesItem.price}>
          <span>{item.price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <h3 className={stylesItem.title}>{item.name}</h3>
      </div>
    )
  );
};

IngredientItem.propTypes = {
  item: ingredientType,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  count: PropTypes.number,
};

export default IngredientItem;
