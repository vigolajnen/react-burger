import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

export const initStore = () => {
  const store =  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
  return store;
};
