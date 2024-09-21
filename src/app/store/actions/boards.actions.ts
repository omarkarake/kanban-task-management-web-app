import { createAction, props } from '@ngrx/store';
import { Board, Column, Subtask, Task } from '../../models/boards.modal';

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

// Action to delete a board by ID
export const deleteBoard = createAction(
  '[Boards] Delete Board',
  props<{ boardId: string }>()
);

// Action to update subtasks in a task
export const updateSubtaskInTask = createAction(
  '[Boards] Update Subtask in Task',
  props<{ taskId: string; updatedSubtasks: Subtask[] }>()
);

// Action to update the status of a task
export const updateTaskStatus = createAction(
  '[Boards] Update Task Status',
  props<{ taskId: string; newStatus: string }>()
);

// Action definition (update with original title)
export const updateTaskInStore = createAction(
  '[Boards] Update Task In Store',
  props<{ task: Task; originalTitle: string }>() // Include the originalTitle
);