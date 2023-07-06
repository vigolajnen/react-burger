import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from './constants';

const wsActions = {
  wsStart: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_MESSAGE,
  wsSend: WS_SEND_MESSAGE
}

const composeEnhancers = composeWithDevTools({ trace: true });
const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const store = createStore(rootReducer, enhancer);
