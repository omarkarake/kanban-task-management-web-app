import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as BoardsActions from '../actions/boards.actions';
import { Board, Task } from '../../models/boards.modal';
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

  // Handle updating a board
  on(BoardsActions.updateBoard, (state, { board }) => {
    if (state.selectedBoardIndex === null) {
      console.error('No board selected');
      return state;
    }

    // Fetch the selected board from the state
    const selectedBoard = state.entities[state.ids[state.selectedBoardIndex]];

    // Log the selected board for debugging
    console.log('Selected board for updating:', selectedBoard);

    if (!selectedBoard) {
      console.error(
        'No board found for selected index:',
        state.selectedBoardIndex
      );
      return state;
    }

    console.log('Updating board with ID:', selectedBoard.id);
    console.log('Updated board details:', board);

    // Update the columns by keeping the tasks intact
    const updatedColumns = board.columns.map((updatedColumn, index) => {
      const existingColumn = selectedBoard.columns[index]; // Get the existing column by index

      return existingColumn
        ? { ...existingColumn, name: updatedColumn.name } // Update the name and keep the tasks
        : { ...updatedColumn, tasks: [] }; // For new columns, initialize tasks as empty
    });

    // Check if columns need to be removed
    const trimmedColumns =
      updatedColumns.length < selectedBoard.columns.length
        ? updatedColumns
        : [...updatedColumns];

    // Proceed with updating the board by using the existing board ID
    return adapter.updateOne(
      {
        id: selectedBoard.id, // Use the existing ID of the selected board
        changes: { name: board.name, columns: trimmedColumns },
      },
      state
    );
  }),

  on(BoardsActions.deleteBoard, (state, { boardId }) => {
    console.log('Reducer is deleting board with ID:', boardId);
    return adapter.removeOne(boardId, state);
  }),

  // Handle updating subtasks in a task
  on(
    BoardsActions.updateSubtaskInTask,
    (state, { taskId, updatedSubtasks }) => {
      if (state.selectedBoardIndex === null) {
        console.error('No board selected');
        return state;
      }

      const selectedBoard = state.entities[state.ids[state.selectedBoardIndex]];
      if (!selectedBoard) {
        console.error('No board found for selected index');
        return state;
      }

      // Find the task in the columns and update the subtasks
      const updatedColumns = selectedBoard.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.title === taskId ? { ...task, subtasks: updatedSubtasks } : task
        ),
      }));

      // Update the state with the new subtasks
      return adapter.updateOne(
        {
          id: selectedBoard.id,
          changes: { columns: updatedColumns },
        },
        state
      );
    }
  ),

  // Handle updating task status
  on(BoardsActions.updateTaskStatus, (state, { taskId, newStatus }) => {
    if (state.selectedBoardIndex === null) {
      console.error('No board selected');
      return state;
    }
  
    const selectedBoard = state.entities[state.ids[state.selectedBoardIndex]];
    if (!selectedBoard) {
      console.error('No board found for selected index');
      return state;
    }
  
    // Step 1: Find the task and remove it from its current column
    let taskToUpdate: Task | null = null; // Ensure taskToUpdate is initialized as null
    const updatedColumnsWithoutTask = selectedBoard.columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => {
        if (task.title === taskId) {
          taskToUpdate = task; // Store the task for later
          return false; // Remove the task from the current column
        }
        return true; // Keep other tasks in the column
      }),
    }));
  
    // If task is not found, return the state
    if (!taskToUpdate) {
      console.error('Task not found');
      return state;
    }
  
    // Step 2: Update the task's status
    const updatedTask: Task = { ...(taskToUpdate as Task), status: newStatus };
  
    // Step 3: Add the updated task to the corresponding column based on its new status
    const updatedColumnsWithTask = updatedColumnsWithoutTask.map((column) => {
      if (column.name.toLowerCase() === newStatus.toLowerCase()) {
        return {
          ...column,
          tasks: [...column.tasks, updatedTask], // Add the task to the new status column
        };
      }
      return column; // No changes to other columns
    });
  
    // Step 4: Update the state with the new columns
    return adapter.updateOne(
      {
        id: selectedBoard.id,
        changes: { columns: updatedColumnsWithTask },
      },
      state
    );
  })
  
);

// Export selectors for getting entities and the state
export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
