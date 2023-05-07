import {
  GET_REGISTR_REQUEST,
  GET_REGISTR_SUCCESS,
  GET_REGISTR_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  USER_LOGOUT,
  CREATE_USER,
  unitTestUser,
} from '../actions/user';

const initialState = {
  testUser: {
    email: 'test-data@yandex.ru',
    password: '123456',
    name: 'Bob',
  },
  user: {
    name: null,
    email: null,
    id: null,
  },
  token: null,
  refreshToken: null,
  isAuth: false,
  userRequest: false,
  userFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTR_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_REGISTR_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        user: action.user,
        token: action.token,
        refreshToken: action.refreshToken,
        isAuth: !state.isAuth,
        userRequest: false,
      };
    }
    case GET_REGISTR_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        user: action.user,
        token: action.token,
        refreshToken: action.refreshToken,
        isAuth: !state.isAuth,
        userRequest: false,
      };
    }
    case GET_LOGIN_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        user: {
          name: null,
          email: null,
        },
        token: null,
        refreshToken: null,
        isAuth: false,
      };
    }
    case GET_LOGOUT_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        user: {
          name: null,
          email: null,
        },
        token: null,
        refreshToken: null,
        isAuth: false,
      };
    }
    case CREATE_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case CREATE_USER: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        testUser: state.testUser,
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        testUser: unitTestUser(state.testUser),
      };
    }
    case CREATE_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    default: {
      return state;
    }
  }
};
