import { getCookie } from './utils';
// 1 раз объявляем базовый урл
export const BASE_URL = 'https://norma.nomoreparties.space/api/';

// создаем функцию проверки ответа на `ok`
export const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
export const checkSuccess = res => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const generalRequest = async (endpoint, options) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return await fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const loginRequest = async form => {
  return await fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form),
  });
};

export const createTestUser = async () => {
  generalRequest(`auth/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: {
        email: 'test-data@yandex.ru',
        password: 'password',
        name: 'Username',
      },
    }),
  });
};

export const getUserRequest = async () =>
  await fetch(`${BASE_URL}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });

export const postUserRequest = async () =>
  await fetch(`${BASE_URL}auth/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test-data@yandex.ru',
      password: 'password',
      name: 'Username',
    }),
  });

export const logoutRequest = async () => {
  return await fetch(`${BASE_URL}auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
};

export const passwordResetRequest = async form => {
  return await fetch(`${BASE_URL}password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
};

export const passwordNewRequest = async form => {
  return await fetch(`${BASE_URL}password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
};
