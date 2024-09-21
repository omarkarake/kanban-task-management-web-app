import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as BoardsActions from '../actions/boards.actions';
import { Board } from '../../models/boards.modal';
import { addTaskToColumn } from '../actions/boards.actions';

// Extend EntityState to use NgRx Entity for boards
export interface BoardsState extends EntityState<Board> {
  loaded: boolean;
  error: string | null;
  selectedBoardIndex: number | null;
  // here is where the
}

// Create an adapter for Board entities using 'id' as the unique identifier
export const adapter: EntityAdapter<Board> = createEntityAdapter<Board>({
  selectId: (board: Board) => board.id, // Use the generated 'id' field
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
  }),

  // Handle adding a task to a specific column
  on(addTaskToColumn, (state, { task, columnName }) => {
    console.log('Dispatched addTaskToColumn action');
    console.log('Task:', task);
    console.log('Column Name:', columnName);
    console.log('Selected Board Index:', state.selectedBoardIndex);

    if (state.selectedBoardIndex === null) {
      console.error('No board selected');
      return state;
    }

    const selectedBoard = state.entities[state.ids[state.selectedBoardIndex]];
    console.log('Selected Board:', selectedBoard);

    if (!selectedBoard) {
      console.error('No board found for selected index');
      return state;
    }

    return adapter.updateOne(
      {
        id: selectedBoard.id,
        changes: {
          columns: selectedBoard.columns.map((column) =>
            column.name === columnName
              ? {
                  ...column,
                  tasks: [...column.tasks, task], // Add task to the correct column
                }
              : column
          ),
        },
      },
      state
    );
  }),

  // Handle adding a column to the selected board
  on(BoardsActions.addColumnToBoard, (state, { column }) => {
    if (state.selectedBoardIndex === null) {
      console.error('No board selected');
      return state;
    }

    console.log('Dispatched addColumnToBoard action', column);

    const selectedBoard = state.entities[state.ids[state.selectedBoardIndex]];
    if (!selectedBoard) {
      console.error('No board found for selected index');
      return state;
    }

    // Update the columns of the selected board
    return adapter.updateOne(
      {
        id: selectedBoard.id,
        changes: {
          columns: [...selectedBoard.columns, column],
        },
      },
      state
    );
  }),

  on(BoardsActions.updateBoard, (state, { board }) => {
    return adapter.updateOne(
      {
        id: board.id,
        changes: { name: board.name, columns: board.columns },
      },
      state
    );
  })
);

// Export selectors for getting entities and the state
export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
