import {
  DELETE_CONSTRUCTOR_ITEM,
  ADD_CONSTRUCTOR_ITEM,
  SORT_CONSTRUCTOR_ITEMS,
} from '../constants';
import { TIngredient } from '../../utils/types';
import { TConstructorItemsActions } from '../actions/constructor-items';

export type TConstructorItemsState = {
  constructorBun: Array<TIngredient> | any;
  constructorItems: Array<TIngredient> | any;
};

const initialState: TConstructorItemsState = {
  constructorBun: [],
  constructorItems: [],
};

export const constructorItemsReducer = (
  state = initialState,
  action: TConstructorItemsActions,
): TConstructorItemsState => {
  switch (action.type) {
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorItems: [
          ...state.constructorItems.slice(0, action.payload),
          ...state.constructorItems.slice(action.payload + 1),
        ],
      };
    }
    case SORT_CONSTRUCTOR_ITEMS: {
      const constructorItems = [...state.constructorItems];
      constructorItems.splice(
        action.payload.to,
        0,
        constructorItems.splice(action.payload.from, 1)[0],
      );
      return {
        ...state,
        constructorItems,
      };
    }
    case ADD_CONSTRUCTOR_ITEM: {
      if (action.payload.type === 'bun') {
        if (state.constructorBun.length !== 0) {
          if (state.constructorBun[0].name === action.payload.name) {
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
