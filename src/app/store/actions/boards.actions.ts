import { createAction, props } from '@ngrx/store';
import { Board, Column, Task } from '../../models/boards.modal';

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

// Action to add a task to a specific column
export const addTaskToColumn = createAction(
  '[Boards] Add Task to Column',
  props<{ task: Task, columnName: string }>() // Using column name or you can use ID if you have it
);

// Action to add a column to a selected board
export const addColumnToBoard = createAction(
  '[Boards] Add Column to Board',
  props<{ column: Column }>()
);

// boards.actions.ts
export const updateBoard = createAction(
  '[Boards] Update Board',
  props<{ board: Board }>()
);