import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';

import { TConstructorItemsActions } from '../actions/constructor-items';
import { TGetOrderActions } from '../actions/order';
import { TGetIngredientsActions } from '../actions/menu';
import { TUserActions } from '../actions/user';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TConstructorItemsActions
  | TGetOrderActions
  | TGetIngredientsActions
  | TUserActions;

export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
  >;

export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
