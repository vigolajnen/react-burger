import { generalRequest } from '../api';
import { deleteCookie, setCookie } from '../utils';

export const GET_REGISTR_REQUEST = 'GET_REGISTR_REQUEST';
export const GET_REGISTR_SUCCESS = 'GET_REGISTR_SUCCESS';
export const GET_REGISTR_FAILED = 'GET_REGISTR_FAILED';
export const UPDATE_USER = 'UPDATE_USER';

export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST';
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS';
export const GET_LOGOUT_FAILED = 'GET_LOGOUT_FAILED';
export const USER_LOGOUT = 'USER_LOGOUT';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';
export const CREATE_USER = 'CREATE_USER';

const optionTestUserPost = testUser => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testUser),
  };
};

const optionLoginRequestPost = form => {
  return {
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
  };
};

const optionLogoutRequest = () => {
  return {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
};

export const optionLogoutRequestPost = () => {
  return {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };
};

export const userLogin = form => dispatch => {
  dispatch({
    type: GET_LOGIN_REQUEST,
  });
  generalRequest('auth/login', optionLoginRequestPost(form))
    .then(res => {
      dispatch({
        type: GET_LOGIN_SUCCESS,
        user: { ...res.user, id: res.user._id },
        token: res.accessToken,
        refreshToken: res.refreshToken,
      });
      setCookie('token', res.accessToken);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_LOGIN_FAILED,
      });
    });
};

export const userRegister = form => dispatch => {
  dispatch({
    type: GET_REGISTR_REQUEST,
  });
  generalRequest('auth/register', optionLoginRequestPost(form))
    .then(res => {
      dispatch({
        type: GET_REGISTR_SUCCESS,
        user: { ...res.user, id: res.user._id },
        token: res.accessToken,
        refreshToken: res.refreshToken,
      });
      setCookie('token', res.accessToken);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_REGISTR_FAILED,
      });
    });
};

export const userLogout = () => dispatch => {
  dispatch({
    type: GET_LOGOUT_REQUEST,
  });
  generalRequest('auth/logout', optionLogoutRequest())
    .then(() => {
      dispatch({
        type: GET_LOGOUT_SUCCESS,
      });
      deleteCookie('token');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_LOGOUT_FAILED,
      });
    });
};

export const unitTestUser = testUser => dispatch => {
  generalRequest('auth/user', optionTestUserPost(testUser)).then((res) => {
    console.log(res);
    dispatch({
      type: CREATE_USER,
    });
  });
};
