import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
// dnd
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addConstructorItems } from '../../services/actions/constructor-items';
import { ADD_CONSTRUCTOR_ITEM } from '../../services/actions/menu';

import appStyles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  // const handleDrop = ({ item}) => {
  //   console.log(item);
  //   // dispatch({
  //   //   type: ADD_CONSTRUCTOR_ITEM,
  //   //   ...item
  //   // });
    
    
  // };

  return (
    <div className={appStyles.app}>
      <AppHeader className={appStyles.header} />
      <main className={appStyles.main}>
        <h1 className={appStyles.title}>Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
