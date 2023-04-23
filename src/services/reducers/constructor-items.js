import {
  UPDATE_CONSTRUCTOR_ITEMS,
  DELETE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_ITEM,
} from '../actions/constructor-items';

const initialState = {
  constructorItems: [],
};

export const constructorItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CONSTRUCTOR_ITEMS: {
      return {
        ...state,
        constructorItems: state.constructorItems.map(
          elem =>
            elem.id === action.id ? { ...elem, board: action.board } : elem,
        ),
      };
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorItems: state.constructorItems.filter(
          item => item.id !== action.id,
        ),
      };
    }
    case ADD_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorItems: [
          ...state.constructorItems,
          action.payload,
        ],
      };
    }
    default:
      return state;
  }
};
