import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, RootState } from '../services/types';

export const useDispatch = () => dispatchHook<AppDispatch>();
// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
