import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  MODAL_ADD_INGREDIENT,
  MODAL_DELETE_INGREDIENT,
} from '../constants';

import { TIngredient } from '../../utils/types';
import { TGetIngredientsActions } from '../actions/menu';
import { TModalIngredientActions } from '../actions/modal';

export type TGetIngredientsState = {
  ingredients: Array<TIngredient>;
  ingredientsRequest: Boolean;
  ingredientsFailed: Boolean;
  ingredient: TIngredient | any;
};

const initialState: TGetIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredient: null,
};

export const menuReducer = (state = initialState, action: TGetIngredientsActions | TModalIngredientActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case MODAL_ADD_INGREDIENT: {
      return {
        ...state,
        ingredient: action.ingredient,
      };
    }
    case MODAL_DELETE_INGREDIENT: {
      return {
        ...state,
        ingredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
