import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from '../ingredient-item/IngredientItem';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

import stylesIngredients from './BurgerIngredients.module.css';

const BurgerIngredients = ({ ...props }) => {
  const [openModal, setOpenModal] = useState();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [current, setCurrent] = useState('Булки');

  const activeTab = (tab) => {
    setCurrent(tab);

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

  // массив обектов заголовок + список
  const tabsIngredientsArr = [];
  for (let i in tabLabels) {
    const tabObj = {};
    tabObj.title = tabLabels[i];
    if (tabLabels[i] === 'Булки') {
      tabObj.list = bunIngredients;
    } else if (tabLabels[i] === 'Соусы') {
      tabObj.list = sauceIngredients;
    } else {
      tabObj.list = mainIngredients;
    }
    tabsIngredientsArr.push(tabObj);
  }

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
          {tabsIngredientsArr.map((wrapItem) => (
            <div className={stylesIngredients.grid} key={wrapItem.title}>
              <h3
                className={stylesIngredients.title}
                data-title={wrapItem.title}
              >
                {wrapItem.title}
              </h3>
              {wrapItem.list.map((item) => (
                <div key={item._id}>
                  <IngredientItem
                    item={item}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    type={item.type}
                    onClick={handleOpenModal}
                  />
                  {openModal && (
                    <Modal
                      title='Детали ингредиента'
                      onClose={handleCloseModal}
                    >
                      <IngredientDetails item={item} />
                    </Modal>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredients;
