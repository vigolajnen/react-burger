const BASE_URL = 'https://norma.nomoreparties.space/api/';

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

export const sendGetIngredientsRequest = (nameDate) => {
  return fetch(BASE_URL + nameDate).then(getRespose);
};

export const sendGetOrderRequest = (nameDate) => {
  return fetch(BASE_URL + nameDate, requestOptions).then(getRespose);
};
