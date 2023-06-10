import { combineReducers } from 'redux';

import { orderReducer } from './order';
import { menuReducer } from './menu';
import { boardsReducer } from './boards';
import { constructorItemsReducer } from './constructor-items';
import { userReducer } from './user';
import { wsReducer } from './wsReducer';

export const rootReducer = combineReducers({
  orders: orderReducer,
  ingredients: menuReducer,
  boardList: boardsReducer,
  constructorItemsList: constructorItemsReducer,
  user: userReducer,
  feedList: wsReducer
});
