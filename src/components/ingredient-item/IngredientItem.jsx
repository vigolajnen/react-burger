import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

import stylesItem from './IngredientItem.module.css';

const IngredientItem = ({ item }) => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const onChangeOpen = () => {
    setOpen(!open);
    setCount(count);
  };

  return (
    <>
      <div
        className={stylesItem.item}
        data-id={item._id}
        data-value={item.type}
        onClick={onChangeOpen}
      >
        {count !== 0 && (
          <Counter count={count} size='default' extraClass='m-1' />
        )}

        <img className={stylesItem.pic} src={item.image} alt={item.name} />
        <div className={stylesItem.price}>
          <span>{item.price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <h3 className={stylesItem.title}>{item.name}</h3>
      </div>
      <Modal isOpen={open} onClose={onChangeOpen}>
        <IngredientDetails item={item} />
      </Modal>
    </>
  );
};

IngredientItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default IngredientItem;
