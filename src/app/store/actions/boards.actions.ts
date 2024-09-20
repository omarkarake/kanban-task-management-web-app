import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/boards.modal';

// Action to load boards data
export const loadBoardsData = createAction(
  '[Boards API] Load Boards Data',
  props<{ boards: Board[] }>()
);

// Action to select a board
export const selectBoard = createAction(
  '[Boards] Select Board',
  props<{ index: number }>()
);

// Action to add a new board to the store
export const addBoard = createAction(
  '[Boards] Add Board',
  props<{ board: Board }>()
);