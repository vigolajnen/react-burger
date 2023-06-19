import { generalRequest } from '../api';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_PRICE,
  GET_ORDER_NUMBER,
  UPDATE_ORDERS,
} from '../constants';

import { TIngredient, TOrder } from '../../utils/types';
import { AppDispatch } from '../types';
import { getCookie } from '../utils';

// Типизация экшенов
export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orders?: any;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderPriceAction {
  readonly type: typeof GET_ORDER_PRICE;
  readonly orderPrice?: any;
}
export interface IGetOrderNumberAction {
  readonly type: typeof GET_ORDER_NUMBER;
}

export interface IGetOrderUpdateAction {
  readonly type: typeof UPDATE_ORDERS;
  payload?: Array<TIngredient>;
}

// Объединяем в Union
export type TGetOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IGetOrderPriceAction
  | IGetOrderNumberAction
  | IGetOrderUpdateAction;

// export const GetOrderPriceAction = (): IGetOrderPriceAction => ({
//   type: GET_ORDER_PRICE,
// });

// export const GetOrderUpdateAction = (): IGetOrderUpdateAction => ({
//   type: UPDATE_ORDERS,
// });

// const GetOrderRequestAction = (): IGetOrderRequestAction => ({
//   type: GET_ORDER_REQUEST,
// });

// const GetOrderSuccessAction = (): IGetOrderSuccessAction => ({
//   type: GET_ORDER_SUCCESS,
// });

// const GetOrderFailedAction = (): IGetOrderFailedAction => ({
//   type: GET_ORDER_FAILED,
// });


const optionRequestPost = (orderData: Array<TIngredient>, token: string | null| undefined) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      ingredients: [...orderData],
    }),
  };
};

export const loadOrder = (orderData: Array<TIngredient>) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });
  generalRequest('orders', optionRequestPost(orderData, getCookie('token')))
    .then((res) => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        orders: res.order,
        order: res.order.order,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ORDER_FAILED,
      });
    });
};
