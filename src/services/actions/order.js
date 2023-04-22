import { sendGetOrderRequest } from '../api';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const GET_ORDER_PRICE = 'GET_ORDER_PRICE';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';

export const loadOrder = () => dispatch => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });
  sendGetOrderRequest()
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.data,
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ORDER_FAILED,
      });
    });
};
