const BASE_URL = 'https://norma.nomoreparties.space/api/';

const getRespose = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
};

export const sendGetIngredientsRequest = nameDate => {
  return fetch(BASE_URL + nameDate).then(getRespose);
};

export const sendGetOrderRequest = (nameDate, orderData) => {
  return fetch(BASE_URL + nameDate, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients: [...orderData],
    }),
  }).then(getRespose);
};
