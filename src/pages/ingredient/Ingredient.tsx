import React, { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useSelector } from '../../hooks';

import IngredientDetails from '../../components/ingredient-details/IngredientDetails';
import { HomePage } from '../home/home';

import { TIngredient } from '../../utils/types';

const IngredientPage: FC = () => {
  const location = useLocation();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  let { id } = useParams();
  const ingredient = ingredients.find((item: TIngredient) => item._id === id);

  return (
    <>
      {location.state?.from === '/' ? (
        <HomePage />
      ) : (
        ingredient && <IngredientDetails />
      )}
    </>
  );
};

export default IngredientPage;
