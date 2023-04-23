import { combineReducers } from 'redux';
// import { draggableIngredientsReducer } from './draggable-items';
// import { dropTargetReducer } from './drop-target';
import { orderReducer } from './order';
import { menuReducer } from './menu';
import { boardsReducer } from './boards';
import { constructorItemsReducer } from './constructor-items';

export const rootReducer = combineReducers({
  orders: orderReducer,
  ingredients: menuReducer,
  boardList: boardsReducer,
  constructorItemsList: constructorItemsReducer,
  // itemsList: draggableIngredientsReducer,
  // containerList: dropTargetReducer,
});
