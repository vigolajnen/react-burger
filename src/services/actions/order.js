import { generalRequest } from '../api';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const GET_ORDER_PRICE = 'GET_ORDER_PRICE';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';

const optionRequestPost = orderData => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: [...orderData],
    }),
  };
};

export const loadOrder = orderData => dispatch => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });
  generalRequest('orders', optionRequestPost(orderData))
    .then(res => {
      dispatch({
        type: GET_ORDER_SUCCESS,
        orders: res.order,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ORDER_FAILED,
      });
    });
};
