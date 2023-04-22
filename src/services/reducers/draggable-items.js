import { UPDATE_TYPE } from '../actions/draggable-items';

const initialState = {
  ingredients: [
    {
      id: crypto.randomUUID(),
      board: 'default',
    },
  ],
};

export const draggableIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TYPE: {
      return {
        ...state,
        ingredients: state.ingredients.map(
          item =>
            item.id === action.id
              ? { ...item, board: action.board }
              : item,
        ),
      };
    }
    default:
      return state;
  }
};
