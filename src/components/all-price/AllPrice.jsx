import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import allPriceStyles from './allPriceStyles.module.css';

const AllPrice = ({ items }) => {

  const sum = items.reduce((a, b) => a + b.price, 0);
  return (
    <div className={allPriceStyles.price}>

      <span>{sum}</span>
      <CurrencyIcon type='primary' />
    </div>
  );
};

// AllPrice.propTypes = {
//   price: PropTypes.array.isRequired,
// };

export default AllPrice;
