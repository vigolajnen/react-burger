import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import allPriceStyles from './allPriceStyles.module.css';

const initialPrice = { price: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return { price: action.payload };
    case 'reset':
      return initialPrice;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const AllPrice = ({ ingredients }) => {
  const [state, dispatch] = useReducer(reducer, initialPrice);

    dispatch({ type: 'set', payload:  ingredients.reduce((a, b) => a + b.price, 0)});
  

  // const sum = data.reduce((a, b) => a + b.price, 0);
  return (
    <div className={allPriceStyles.price}>

      <span>{state.price}</span>
      <CurrencyIcon type='primary' />
    </div>
  );
};

AllPrice.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AllPrice;
