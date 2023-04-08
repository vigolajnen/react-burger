import React from 'react';
// import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import stylesContent from './IngredientDetails.module.css';

function IngredientDetails({ item }) {
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

IngredientDetails.propTypes = ingredientType;

export default IngredientDetails;
