import React from 'react';
import stylesContent from './IngredientDetails.module.css';

type Props = {
  item: {
    name: string;
    image_large: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
  };
};

function IngredientDetails({ item }: Props) {
  return (
    <>
      <img
        className={stylesContent.pic}
        src={item.image_large}
        alt={item.name}
      />
      <h3 className={stylesContent.title}>{item.name}</h3>
      <ul className={stylesContent.list}>
        <li>
          <span>Калории,ккал</span>
          <span>{item.calories}</span>
        </li>
        <li>
          <span>Белки, г</span>
          <span>{item.proteins}</span>
        </li>
        <li>
          <span>Жиры, г</span>
          <span>{item.fat}</span>
        </li>
        <li>
          <span>Углеводы, г</span>
          <span>{item.carbohydrates}</span>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
