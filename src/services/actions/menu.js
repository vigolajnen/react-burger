import { sendGetIngredientsRequest } from '../api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const MODAL_ADD_INGREDIENT = 'MODAL_ADD_INGREDIENT';
export const MODAL_DELETE_INGREDIENT = 'MODAL_DELETE_INGREDIENT';

export const loadIngredients = () => dispatch => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  sendGetIngredientsRequest('ingredients')
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
