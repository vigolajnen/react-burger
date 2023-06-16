import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';

import { TConstructorItemsActions } from '../actions/constructor-items';
import { TGetOrderActions } from '../actions/order';
import { TGetIngredientsActions } from '../actions/menu';
import { TUserActions } from '../actions/user';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../constants';
import { TWSActions } from './actions';

export type AppActions = TWSActions | TUserActions |TApplicationActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;


export type TApplicationActions =
  | TConstructorItemsActions
  | TGetOrderActions
  | TGetIngredientsActions
  | TUserActions;


  export type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    wsSendMessage: typeof  WS_SEND_MESSAGE,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof  WS_CONNECTION_ERROR,
    onMessage: typeof  WS_GET_MESSAGE,
  };
