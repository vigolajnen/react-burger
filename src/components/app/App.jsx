import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import appStyles from './App.module.css';
const data = require('../../utils/data.json');

function App() {
  const topElement = data[0];
  const buttomElement = data[data.length - 1];
  const newData = data.slice(1, -1);

  return (
    <div className={appStyles.app}>
      <AppHeader className={appStyles.header} />
      <main className={appStyles.main}>
        <h1 className={appStyles.title}>Соберите бургер</h1>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor
          firstElement={topElement}
          lastElement={buttomElement}
          listElements={newData}
        />
      </main>
    </div>
  );
}

export default App;
