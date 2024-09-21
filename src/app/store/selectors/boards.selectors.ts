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

// Add the selectIds selector to get the list of board IDs
export const selectIds = createSelector(
  selectBoardsState,
  adapter.getSelectors().selectIds // This provides the list of board IDs
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

// Select columns of the selected board by index
export const selectColumnsByBoardIndex = (index: number) =>
  createSelector(selectAllBoards, (boards) => boards[index]?.columns ?? []);

// Select the selected board index
export const selectSelectedBoardIndex = createSelector(
  selectBoardsState,
  (state) => state.selectedBoardIndex
);

// Select columns of the selected board
export const selectColumnsOfSelectedBoard = createSelector(
  selectAllBoards,
  selectSelectedBoardIndex,
  (boards, selectedIndex) => selectedIndex !== null ? boards[selectedIndex]?.columns ?? [] : []
);