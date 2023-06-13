import React, { useState, useMemo } from 'react';
import { useSelector } from '../../hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from '../ingredient-item/IngredientItem';
import stylesIngredients from './BurgerIngredients.module.css';
import { TIngredient } from '../../utils/types';

type TIngredientId = Omit<TIngredient, '_id'> & {
  _id: number;
};

const BurgerIngredients = () => {
  
  const { ingredients } = useSelector((state) => state.ingredients);
  const ingredientsRequest = useSelector(
    (state) => state.ingredients.ingredientsRequest,
  );
  const ingredientsFailed = useSelector(
    (state) => state.ingredients.ingredientsFailed,
  );
  const constructorBun = useSelector(
    (state) => state.constructorItemsList.constructorBun,
  );
  const constructorItems = useSelector(
    (state) => state.constructorItemsList.constructorItems,
  );

  const countersItems = useMemo(() => {
    const itemOrderCounters: Array<number> = [];

    constructorItems.forEach((item: TIngredientId) => {
      if (!itemOrderCounters[item._id]) itemOrderCounters[item._id] = 0;
      itemOrderCounters[item._id]++;
    });
    if (constructorBun && constructorBun.length > 0)
      itemOrderCounters[constructorBun[0]._id] = 2;
    return itemOrderCounters;
  }, [constructorItems, constructorBun]);

  const [current, setCurrent] = useState<string>('Булки');

  const activeTab = (tab: string) => {
    setCurrent(tab);

    document.querySelector('[data-title="' + tab + '"]')?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

  const onScrollActiveTab = () => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setCurrent(entry.target!.getAttribute('title')!);
          }
        });
      },
      {
        root: document.querySelector('.custom-scroll') as Element,
        threshold: [0.2, 0.3, 0.5, 1],
      },
    );
    document
      .querySelectorAll('.custom-scroll > div')
      .forEach((div: Element) => observer.observe(div));
  };

  const tabLabels = ['Булки', 'Соусы', 'Начинки'];

  const bunIngredients = ingredients.filter(
    (item: TIngredient) => item.type === 'bun',
  );
  const sauceIngredients = ingredients.filter(
    (item: TIngredient) => item.type === 'sauce',
  );
  const mainIngredients = ingredients.filter(
    (item: TIngredient) => item.type === 'main',
  );

  // массив объектов заголовок + список
  const tabsIngredientsArr = [];

  for (let i in tabLabels) {
    const tabObj: { title: string; list: Array<TIngredient> } = {
      title: tabLabels[0],
      list: bunIngredients,
    };
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
                {wrapItem.list.map((item: any) => {
                  return (
                    <IngredientItem
                      key={item._id}
                      id={item._id}
                      item={item}
                      count={countersItems[item._id]}
                      type={undefined}
                      props={undefined}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default BurgerIngredients;
