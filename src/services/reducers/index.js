import { combineReducers } from 'redux';
// import { draggableIngredientsReducer } from './draggable-items';
// import { dropTargetReducer } from './drop-target';
import { orderReducer } from './order';
import { menuReducer } from './menu';

export const rootReducer = combineReducers({
  order: orderReducer,
  ingredients: menuReducer,
  // itemsList: draggableIngredientsReducer,
  // containerList: dropTargetReducer,
});
