import React from 'react';
import { TIngredient } from '../../utils/types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import stylesItem from './IngredientItem.module.css';

import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';

type Props = {
  item: TIngredient;
  id: string;
  count: number;
} & JSX.Element;

// handleClick
const IngredientItem = ({ item, id, count }: Props) => {
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
    <Link
      // item={item}
      state={{ item: item }}
      to={`/ingredients/${item._id}`}
      className={stylesItem.item}
      id={item._id}
      data-id={item._id}
      data-value={item.type}
      data-count={isDrag}
      ref={dragRef}
      style={{ cursor: 'move' }}
    >
      { count > 0 && <Counter count={count} size='default' extraClass='m-1' />}

      <img className={stylesItem.pic} src={item.image} alt={item.name} />
      <div className={stylesItem.price}>
        <span>{item.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className={stylesItem.title}>{item.name}</h3>
    </Link>
  );
};

export default IngredientItem;
