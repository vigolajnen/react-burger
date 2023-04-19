import { UPDATE_TYPE } from '../actions/draggable-items';

const initialState = {
  items: [
    {
      id: { id },
      container: 'default',
    },
  ],
};

export const draggableItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TYPE: {
      return {
        ...state,
        items: state.items.map(
          item =>
            item.id === action.id
              ? { ...item, container: action.container }
              : item,
        ),
      };
    }
    default:
      return state;
  }
};
