import React from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
// dnd
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import appStyles from './App.module.css';

import { useSelector } from 'react-redux';

function App() {
  // const boards = useSelector(state => state.boardList.boards)
  const [elements, setElements] = React.useState([]);
  const [draggedElements, setDraggedElements] = React.useState([]);

  const handleDrop = (itemId) => {
    setElements([...elements.filter((element) => element.id !== itemId.id)]);

    setDraggedElements([
      ...draggedElements,
      ...elements.filter((element) => element.id === itemId.id),
    ]);
  };

  return (
    <div className={appStyles.app}>
      <AppHeader className={appStyles.header} />
      <main className={appStyles.main}>
        <h1 className={appStyles.title}>Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor onDropHandler={handleDrop}  />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
