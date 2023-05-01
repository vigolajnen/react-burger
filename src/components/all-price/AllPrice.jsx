import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import allPriceStyles from './allPriceStyles.module.css';

const AllPrice = ({ bun, ingredients }) => {
  let sumBunPrice = bun.reduce((a, b) => a + b.price, 0) * 2;
  let sumIngredientsPrice = ingredients.reduce((a, b) => a + b.price, 0);
  let sum = sumBunPrice + sumIngredientsPrice;

  if (isNaN(sum)) {
    sum = 0;
  }
  return (
    <div className={allPriceStyles.price}>
      <span>{sum}</span>
      <CurrencyIcon type='primary' />
    </div>
  );
};

AllPrice.propTypes = {
  bun: PropTypes.array.isRequired,
  ingredients: PropTypes.array.isRequired,
};

export default AllPrice;
