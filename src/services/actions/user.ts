// import { generalRequest, getUserRequest } from '../api';
import { deleteCookie, setCookie, getCookie } from '../utils';
import {
  registerRequest,
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
  getUserRequest,
  // updateUserRequest,
} from '../api-auth';

import { TUserRequest, TUser } from '../../utils/types';
import {
  GET_REGISTR_REQUEST,
  GET_REGISTR_SUCCESS,
  GET_REGISTR_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
} from '../constants';
import { AppDispatch } from '../types';

// Типизация экшенов
export interface IGetRegistrRequestAction {
  readonly type: typeof GET_REGISTR_REQUEST;
}
export interface IGetRegistrSuccessAction {
  readonly type: typeof GET_REGISTR_SUCCESS;
  readonly user: TUser;
  readonly token: string;
  readonly refreshToken: string;
}
export interface IGetRegistrFailedAction {
  readonly type: typeof GET_REGISTR_FAILED;
}
export interface IGetLogoutRequestAction {
  readonly type: typeof GET_LOGOUT_REQUEST;
}
export interface IGetLogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS;
}
export interface IGetLogoutFailedAction {
  readonly type: typeof GET_LOGOUT_FAILED;
}
export interface IGetLoginRequestAction {
  readonly type: typeof GET_LOGIN_REQUEST;
}
export interface IGetLoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
  readonly user: TUser;
  readonly token: string;
  readonly refreshToken: string;
}
export interface IGetLoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED;
}
export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUserRequest;
}
export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}
export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

// Объединяем в Union
export type TUserActions =
  | IGetRegistrRequestAction
  | IGetRegistrSuccessAction
  | IGetRegistrFailedAction
  | IGetLogoutRequestAction
  | IGetLogoutSuccessAction
  | IGetLogoutFailedAction
  | IGetLoginRequestAction
  | IGetLoginSuccessAction
  | IGetLoginFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IRefreshTokenRequestAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction;

export const userLogin = (state: TUser) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_LOGIN_REQUEST,
  });
  return loginRequest(state)
    .then((res) => {
      if (res && res.success) {
        const token = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch({
          type: GET_LOGIN_SUCCESS,
          user: res.user,
          token: res.accessToken,
          refreshToken: res.refreshToken,
        });
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_LOGIN_FAILED,
      });
    });
};

export const userRegister = (state: TUser) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_REGISTR_REQUEST,
  });
  return registerRequest(state)
    .then((res) => {
      dispatch({
        type: GET_REGISTR_SUCCESS,
        user: res.user,
        token: res.accessToken,
        refreshToken: res.refreshToken,
      });
      setCookie('token', res.accessToken);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_REGISTR_FAILED,
      });
    });
};

export const userLogout = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_LOGOUT_REQUEST,
  });
  return logoutRequest()
    .then(() => {
      dispatch({
        type: GET_LOGOUT_SUCCESS,
      });
      deleteCookie('token');
    })
    .catch((err) => {
      alert(err);
      // console.log(err);
      dispatch({
        type: GET_LOGOUT_FAILED,
      });
    });
};

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });
  return getUserRequest(getCookie('token'))
    .then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: res.user,
      });
    })
    .catch((err) => {
      alert(err);
      // console.log(err);
      dispatch({
        type: GET_USER_FAILED,
      });
      dispatch({
        type: REFRESH_TOKEN_REQUEST,
      });
    });
};

// export const updateUser = (state: TUserRequest) => (dispatch: AppDispatch) => {
//   dispatch({
//     type: GET_USER_REQUEST,
//   });
//   // updateUserRequest({
//   //   email: state.email,
//   //   name: state.name,
//   //   token: getCookie('token'),
//   // })
//     .then((res) => {
//       if (res && res.success) {
//         dispatch({
//           type: GET_USER_SUCCESS,
//           user: res.user,
//         });
//       } else {
//         dispatch({
//           type: GET_USER_FAILED,
//         });
//       }
//     })
//     .catch((err) => {
//       alert(err);
//       dispatch({
//         type: GET_USER_FAILED,
//       });
//     });
// };

export const refreshToken = () => (dispatch: AppDispatch) => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST,
  });
  refreshTokenRequest()
    .then((res) => {
      if (res && res.success) {
        localStorage.setItem('refreshToken', res.refreshToken);
        const token = res.accessToken.split('Bearer ')[1];
        setCookie('token', token);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: REFRESH_TOKEN_FAILED,
      });
      alert(err);
      // console.error(err);
    });
};
