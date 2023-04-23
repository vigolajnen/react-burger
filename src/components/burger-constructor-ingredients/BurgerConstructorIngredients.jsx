import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/BurgerConstructorIngredient';

const BurgerConstructorIngredients = ({ items }) => {
  return items.map((elem) => (
    <BurgerConstructorIngredient key={crypto.randomUUID()} item={elem} id={elem._id} />
  ));
};

BurgerConstructorIngredients.propTypes = {
  items: PropTypes.array.isRequired,
};

export default BurgerConstructorIngredients;
