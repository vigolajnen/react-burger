
export type TBoardsState = {
  boards: ReadonlyArray<string>;
};

const initialState: TBoardsState = {
  boards: ['bun', 'ingredients'],
};

export const boardsReducer = (state = initialState, action: any) => {
  return state;
};
