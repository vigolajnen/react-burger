import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  MODAL_ADD_INGREDIENT,
  MODAL_DELETE_INGREDIENT,
} from '../constants';

import { menuReducer } from './menu';

describe('ingredients', () => {
  const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredient: null,
  };

  it('test initial state', () => {
    expect(menuReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });

  it('test request ingredients', () => {
    const action = { type: GET_INGREDIENTS_REQUEST };
    expect(menuReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsRequest: true,
    });
  });
  it('test success ingredients', () => {
    const ingredients = [{ ingredients: 1 }, { ingredients: 2 }]
    const action = { type: GET_INGREDIENTS_SUCCESS, ingredients: ingredients };
    expect(menuReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsFailed: false,
      ingredientsRequest: false,
      ingredients: ingredients
    });
  });

  it('test failed ingredients', () => {
    const action = { type: GET_INGREDIENTS_FAILED };
    expect(menuReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false
    });
  });

  it('test add ingredient', () => {
    const ingredient = [{ ingredient: 1 }]
    const action = { type: MODAL_ADD_INGREDIENT, ingredient: ingredient };
    expect(menuReducer(initialState, action)).toEqual({
      ...initialState,
      ingredient: ingredient
    });
  });

  it('test delete ingredient', () => {
    const ingredient = [{ ingredient: 1 }]
    const action = { type: MODAL_DELETE_INGREDIENT, ingredient: ingredient };
    expect(menuReducer(initialState, action)).toEqual({
      ...initialState,
      ingredient: null
    });
  });
});
