import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as BoardsActions from '../actions/boards.actions';
import { Board } from '../../models/boards.modal';

// Extend EntityState to use NgRx Entity for boards
export interface BoardsState extends EntityState<Board> {
  loaded: boolean;
  error: string | null;
}

// Create an adapter for Board entities with a custom selectId function
export const adapter: EntityAdapter<Board> = createEntityAdapter<Board>({
  selectId: (board: Board) => board.name  // Assuming 'name' is unique for each board
});

// Define the initial state with entities and other properties
export const initialState: BoardsState = adapter.getInitialState({
  loaded: false,
  error: null,
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
  })
);

// Export selectors for getting entities and the state
export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
