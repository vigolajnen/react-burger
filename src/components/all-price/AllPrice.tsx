import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import allPriceStyles from './allPriceStyles.module.css';

import { TIngredient } from '../../utils/types';

type Props = {
  bun: Array<TIngredient> | any;
  ingredients: Array<TIngredient> | any;
}

const AllPrice = ({ bun, ingredients }: Props) => {
  const sumBunPrice = bun.reduce((a: any, b: any) => a + b.price, 0) * 2;
  const sumIngredientsPrice = ingredients.reduce((a: any, b: any) => a + b.price, 0);
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
