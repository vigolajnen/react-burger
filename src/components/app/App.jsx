import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

import appStyles from './App.module.css';
// const data = require('../../utils/data.json');
const URL_DATA = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(URL_DATA);
        if (response.ok) {
          const json = await response.json();
          setData(json.data);
        } else {
          return Promise.reject(`Ошибка ${response.status}`);
        }
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (hasError) {
    console.log('Произошла ошибка');
  }
  if (data) {
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
  return <div>No data</div>;
}

export default App;
