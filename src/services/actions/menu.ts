import { generalRequest } from '../api';
import { TIngredient } from '../../utils/types';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../constants';
import { AppDispatch } from '../types';

// Типизация экшенов
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export interface IgetIngredientsFaildeAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

// Объединяем в Union
export type TGetIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IgetIngredientsFaildeAction;

export const loadIngredients = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  generalRequest('ingredients')
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    });
};
