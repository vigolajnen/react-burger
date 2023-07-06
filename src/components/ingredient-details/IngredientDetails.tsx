import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from '../../hooks';
import { TIngredient } from '../../utils/types';

// css
import stylesContent from './IngredientDetails.module.css';

const IngredientDetails: FC = () => {
  const items = useSelector((state) => state.ingredients.ingredients);
  const { id } = useParams();
  const currentItem = items.find((item: TIngredient) => item._id === id);

  return (
    <>
      <img
        className={stylesContent.pic}
        src={currentItem?.image_large}
        alt={currentItem?.name}
      />
      <h3 className={stylesContent.title}>{currentItem?.name}</h3>
      <ul className={stylesContent.list}>
        <li>
          <span>Калории,ккал</span>
          <span>{currentItem?.calories}</span>
        </li>
        <li>
          <span>Белки, г</span>
          <span>{currentItem?.proteins}</span>
        </li>
        <li>
          <span>Жиры, г</span>
          <span>{currentItem?.fat}</span>
        </li>
        <li>
          <span>Углеводы, г</span>
          <span>{currentItem?.carbohydrates}</span>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
