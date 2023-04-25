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
      if (action.payload[0].type === 'bun') {
        if (state.constructorBun.length !== 0) {
          if (state.constructorBun[0].name === action.payload[0].name) {
            return { ...state };
          }
          return {
            ...state,
            constructorBun: [
              ...state.constructorBun.slice(0, action.payload[0]),
              action.payload[0],
            ],
          };
        }
        return {
          ...state,
          constructorBun: [...state.constructorBun, action.payload[0]],
        };
      } else if (action.payload[0].type !== 'bun') {
        return {
          ...state,
          constructorItems: [...state.constructorItems, action.payload[0]],
        };
      }
    }
    default: {
      return state;
    }
  }
};
