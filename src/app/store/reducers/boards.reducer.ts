import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as BoardsActions from '../actions/boards.actions';
import { Board } from '../../models/boards.modal';

// Extend EntityState to use NgRx Entity for boards
export interface BoardsState extends EntityState<Board> {
  loaded: boolean;
  error: string | null;
  selectedBoardIndex: number | null;
}

// Create an adapter for Board entities using 'id' as the unique identifier
export const adapter: EntityAdapter<Board> = createEntityAdapter<Board>({
  selectId: (board: Board) => board.id,  // Use the generated 'id' field
});

// Define the initial state with entities and other properties
export const initialState: BoardsState = adapter.getInitialState({
  loaded: false,
  error: null,
  selectedBoardIndex: null,
});

// Reducer function to handle actions
export const boardsReducer = createReducer(
  initialState,
  
  // When data is loaded, update the entities
  on(BoardsActions.loadBoardsData, (state, { boards }) => {
    return adapter.setAll(boards, {
      ...state,
      loaded: true,
    });
  }),

  // Handle selecting a board
  on(BoardsActions.selectBoard, (state, { index }) => ({
    ...state,
    selectedBoardIndex: index,
  })),

  on(BoardsActions.addBoard, (state, { board }) => {
    return adapter.addOne(board, state);
  })
);

// Export selectors for getting entities and the state
export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
