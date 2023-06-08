import { MODAL_ADD_INGREDIENT, MODAL_DELETE_INGREDIENT } from '../constants';

import { TIngredient } from '../../utils/types';

// Типизация экшенов
export interface IModalAddIngredientAction {
  readonly type: typeof MODAL_ADD_INGREDIENT;
  readonly ingredient: TIngredient;
}

export interface IModalDeleteIngredientsAction {
  readonly type: typeof MODAL_DELETE_INGREDIENT;
}

// Объединяем в Union
export type TModalIngredientActions =
  | IModalAddIngredientAction
  | IModalDeleteIngredientsAction;

export const AddIngredientModalAction = (
  item: TIngredient,
): IModalAddIngredientAction => ({
  type: MODAL_ADD_INGREDIENT,
  ingredient: item,
});

// export const addIngredientModal = (item: TIngredient): IModalAddIngredientAction => {
//   return {
//     type: MODAL_ADD_INGREDIENT,
//     ingredient: item,
//   };
// };
