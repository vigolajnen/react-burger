import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from '../ingredient-item/IngredientItem';
import Modal from '../modal/Modal';
import { useModal } from '../../hooks/useModal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import { loadIngredients } from '../../services/actions/menu';
import {
  MODAL_ADD_INGREDIENT,
  MODAL_DELETE_INGREDIENT,
} from '../../services/actions/menu';

import stylesIngredients from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredient = useSelector((state) => state.ingredients.ingredient);
  const ingredientsRequest = useSelector((state) => state.ingredientsRequest);
  const ingredientsFailed = useSelector((state) => state.ingredientsFailed);
  const constructorBun = useSelector(
    (state) => state.constructorItemsList.constructorBun,
  );
  const constructorItems = useSelector(
    (state) => state.constructorItemsList.constructorItems,
  );

  const countersItems = useMemo(() => {
    const itemOrderCounters = [];
    constructorItems.forEach((item) => {
      if (!itemOrderCounters[item._id]) itemOrderCounters[item._id] = 0;
      itemOrderCounters[item._id]++;
    });
    if (constructorBun && constructorBun.length > 0)
      itemOrderCounters[constructorBun[0]._id] = 2;
    return itemOrderCounters;
  }, [constructorItems, constructorBun]);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const [current, setCurrent] = useState('Булки');

  const handleOpenModal = (e) => {
    dispatch({
      type: MODAL_ADD_INGREDIENT,
      ingredient: e,
    });
    openModal();
  };

  const handleCloseModal = () => {
    dispatch({
      type: MODAL_DELETE_INGREDIENT,
    });
    closeModal();
  };

  const activeTab = (tab) => {
    setCurrent(tab);

    document.querySelector('[data-title="' + tab + '"]').scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

  const onScrollActiveTab = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrent(entry.target.title);
          }
        });
      },
      {
        root: document.querySelector('.custom-scroll'),
        threshold: [0.2, 0.3, 0.5, 1],
      },
    );
    document
      .querySelectorAll('.custom-scroll > div')
      .forEach((div) => observer.observe(div));
  };

  const tabLabels = ['Булки', 'Соусы', 'Начинки'];

  const bunIngredients = ingredients.filter((item) => item.type === 'bun');
  const sauceIngredients = ingredients.filter((item) => item.type === 'sauce');
  const mainIngredients = ingredients.filter((item) => item.type === 'main');

  // массив объектов заголовок + список
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

  if (ingredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (ingredientsRequest) {
    return <p>Загрузка...</p>;
  } else {
    return (
      <>
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
            <div className='custom-scroll' onScroll={onScrollActiveTab}>
              {tabsIngredientsArr.map((wrapItem) => (
                <div
                  className={stylesIngredients.grid}
                  key={wrapItem.title}
                  title={wrapItem.title}
                >
                  <h3
                    className={stylesIngredients.title}
                    data-title={wrapItem.title}
                  >
                    {wrapItem.title}
                  </h3>
                  {wrapItem.list.map((item) => (
                    <IngredientItem
                      id={item._id}
                      key={item._id}
                      item={item}
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                      type={item.type}
                      handleClick={() => handleOpenModal(item)}
                      count={countersItems[item._id]}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        {isModalOpen && (
          <Modal title='Детали ингредиента' onClose={handleCloseModal}>
          <IngredientDetails item={ingredient} />
        </Modal>
        )}
      </>
    );
  }
};

export default BurgerIngredients;
