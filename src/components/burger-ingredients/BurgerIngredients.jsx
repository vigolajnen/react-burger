import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from '../ingredient-item/IngredientItem';

import stylesIngredients from './BurgerIngredients.module.css';

const BurgerIngredients = ({ ...props }) => {
  const [current, setCurrent] = useState({ current: 'Булки' });

  const activeTab = (tab) => {
    setCurrent({ current: tab });

    document.querySelector('[data-title="' + tab + '"]').scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

  const tabLabels = ['Булки', 'Соусы', 'Начинки'];

  const bunIngredients = props.ingredients.filter(
    (item) => item.type === 'bun',
  );
  const sauceIngredients = props.ingredients.filter(
    (item) => item.type === 'sauce',
  );
  const mainIngredients = props.ingredients.filter(
    (item) => item.type === 'main',
  );

  return (
    <section>
      <div className={stylesIngredients.header}>
        {tabLabels.map((item) => (
          <Tab
            key={item}
            value={item}
            active={current === item}
            onClick={activeTab}
          >
            {item}
          </Tab>
        ))}
      </div>
      <div className={stylesIngredients.body}>
        <div className='custom-scroll'>
          <div className={stylesIngredients.grid}>
            <h3 className={stylesIngredients.title} data-title='Булки'>
              Булки
            </h3>
            {bunIngredients.map((item) => (
              <IngredientItem
                key={item._id}
                item={item}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                type={item.type}
              />
            ))}
          </div>
          <div className={stylesIngredients.grid}>
            <h3 className={stylesIngredients.title} data-title='Соусы'>
              Соусы
            </h3>
            {sauceIngredients.map((item) => (
              <IngredientItem
                key={item._id}
                item={item}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                type={item.type}
              />
            ))}
          </div>
          <div className={stylesIngredients.grid}>
            <h3 className={stylesIngredients.title} data-title='Начинки'>
              Начинки
            </h3>
            {mainIngredients.map((item) => (
              <IngredientItem
                key={item._id}
                item={item}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                type={item.type}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredients;
