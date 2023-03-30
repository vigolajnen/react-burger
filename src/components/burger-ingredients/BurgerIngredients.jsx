import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsItem from '../burger-ingredients-item/BurgerIngredientsItem';

import stylesIngredients from './BurgerIngredients.module.css';

export default class BurgerIngredients extends React.Component {
  render() {
    const bunIngredients = this.props.ingredients.filter(
      (item) => item.type === 'bun',
    );
    const mainIngredients = this.props.ingredients.filter(
      (item) => item.type === 'main',
    );
    const sauceIngredients = this.props.ingredients.filter(
      (item) => item.type === 'sauce',
    );

    const handelTabClick = () => {
      const tabs = document.querySelectorAll('a[href*="#"]');

      for (let tab of tabs) {
        tab.addEventListener('click', function (e) {
          const blockID = tab.getAttribute('href').substr(1);

          document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'start',
          });
        });
      }
    };

    const [current] = 'Булки';
    // const [current, setCurrent] = React.useState('Булки');
    return (
      <section>
        <div className={stylesIngredients.header}>
          <a href='#bun' className={stylesIngredients.link}>
            <Tab
              value='Булки'
              active={current === 'Булки'}
              onClick={handelTabClick}
              cards={bunIngredients}
            >
              Булки
            </Tab>
          </a>
          <a href='#sauce' className={stylesIngredients.link}>
            <Tab
              value='Соусы'
              active={current === 'Соусы'}
              onClick={handelTabClick}
              cards={sauceIngredients}
            >
              Соусы
            </Tab>
          </a>
          <a href='#main' className={stylesIngredients.link}>
            <Tab
              value='Начинки'
              active={current === 'Начинки'}
              onClick={handelTabClick}
              cards={mainIngredients}
            >
              Начинки
            </Tab>
          </a>
        </div>
        <div style={{ height: '450px', overflow: 'hidden', padding: '10px 0' }}>
          <div
            className='custom-scroll'
            style={{
              height: '100%',
              overflow: 'auto',
            }}
          >
            <div id='bun' className={stylesIngredients.grid}>
              {bunIngredients.map((item) => (
                <BurgerIngredientsItem
                  key={item._id}
                  item={item}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              ))}
            </div>
            <div id='main' className={stylesIngredients.grid}>
              {mainIngredients.map((item) => (
                <BurgerIngredientsItem
                  key={item._id}
                  item={item}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              ))}
            </div>
            <div id='sauce' className={stylesIngredients.grid}>
              {sauceIngredients.map((item) => (
                <BurgerIngredientsItem
                  key={item._id}
                  item={item}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
