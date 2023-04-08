import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

import stylesItem from './IngredientItem.module.css';

const IngredientItem = ({ item }) => {
  const count = 0;
  const [open, setOpen] = useState();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className={stylesItem.item}
        data-id={item._id}
        data-value={item.type}
        onClick={handleOpenModal}
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
      {open && (
        <Modal title='Детали ингредиента' onClose={handleCloseModal}>
          <IngredientDetails item={item} />
        </Modal>
      )}
    </>
  );
};

IngredientItem.propTypes = ingredientType;

export default IngredientItem;
