import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../utils/types';

// css
import allPriceStyles from './allPriceStyles.module.css';

type Props = {
  bun: Array<TIngredient>;
  ingredients: Array<TIngredient>;
};

const AllPrice = ({ bun, ingredients }: Props) => {
  const sumBunPrice: number =
    bun.reduce((a: number, b: TIngredient) => a + b.price, 0) * 2;
  const sumIngredientsPrice: number = ingredients.reduce(
    (a: number, b: TIngredient) => a + b.price,
    0,
  );
  let sum: number = sumBunPrice + sumIngredientsPrice;

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

export default AllPrice;
