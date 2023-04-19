import { combineReducers } from "redux";
import { draggableItemsReducer } from "./draggable-items";
import { dropTargetReducer } from "./drop-target";

export const rootReducer = combineReducers({
  itemsList: draggableItemsReducer,
  containerList: dropTargetReducer
}); 
