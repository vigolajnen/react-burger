const URL_DATA = 'https://norma.nomoreparties.space/api/ingredients';
const URL_ORDER = 'https://norma.nomoreparties.space/api/orders';

const getRespose = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
};

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ingredients: ['643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa093d'],
  }),
};

export const sendGetIngredientsRequest = () => {
  return fetch(URL_DATA).then(getRespose);
};

export const sendGetOrderRequest = () => {
  return fetch(URL_ORDER, requestOptions).then(getRespose);
};
