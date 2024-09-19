import { createAction, props } from '@ngrx/store';
import { Board } from '../../models/boards.modal';

// Action to load boards data
export const loadBoardsData = createAction(
  '[Boards API] Load Boards Data',
  props<{ boards: Board[] }>()
);
