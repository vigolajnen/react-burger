import React from 'react';
import PropTypes from 'prop-types';
import stylesContent from './IngredientDetails.module.css';

function IngredientDetails({ item }) {
  return (
    <>
      <h2 className={stylesContent.titleModal}>Детали ингредиента</h2>
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

IngredientDetails.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }),
};

export default IngredientDetails;
