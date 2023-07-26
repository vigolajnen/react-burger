import { boardsReducer } from './boards';

describe('boards', () => {
  const initialState = {
    boards: ['bun', 'ingredients'],
  }

  it('test initial state', () => {
    expect(boardsReducer(undefined, {})).toEqual({
      ...initialState,
    });
  });
});
