// src/app/store/selectors/boards.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState, adapter } from '../reducers/boards.reducer';

// Select the 'boards' feature state
export const selectBoardsState = createFeatureSelector<BoardsState>('boards');

// Select all boards
export const selectAllBoards = createSelector(
  selectBoardsState,
  adapter.getSelectors().selectAll
);

// Select a specific board by ID
export const selectBoardById = (id: string) =>
  createSelector(selectBoardsState, (state) => state.entities[id]);

// Check if data is loaded
export const selectBoardsLoaded = createSelector(
  selectBoardsState,
  (state) => state.loaded
);

// Select only the names of the boards
export const selectBoardNames = createSelector(
  selectAllBoards,
  (boards) => boards.map(board => board.name)
);