import {
  UPDATE_CONSTRUCTOR_ITEMS,
  DELETE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_ITEM,
} from '../actions/constructor-items';

const initialState = {
  constructorBun: [],
  constructorItems: [],
};

export const constructorItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CONSTRUCTOR_ITEMS: {
      return {
        ...state,
        constructorItems: state.constructorItems.map(
          elem => (elem.id === action.id ? { ...elem } : elem),

          // elem =>
          //   elem.id === action.id ? { ...elem, board: action.board } : elem,
        ),
      };
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorItems: [
          ...state.constructorItems.slice(0, action.payload),
          ...state.constructorItems.slice(action.payload + 1),
        ],
      };
    }
    case ADD_CONSTRUCTOR_ITEM: {
      if (action.payload.type === 'bun') {
        if (state.constructorBun.length !== 0) {
          if (state.constructorBun.name === action.payload.name) {
            return { ...state };
          }
          return {
            ...state,
            constructorBun: [
              ...state.constructorBun.slice(0, action.payload),
              action.payload,
            ],
          };
        }
        return {
          ...state,
          constructorBun: [...state.constructorBun, action.payload],
        };
      } else if (action.payload.type !== 'bun') {
        return {
          ...state,
          constructorItems: [...state.constructorItems, action.payload],
        };
      }
    }
    default: {
      return state;
    }
  }
};
