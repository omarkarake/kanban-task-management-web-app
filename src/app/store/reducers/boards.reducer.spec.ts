import { boardsReducer, initialState, BoardsState, adapter } from './boards.reducer';
import * as BoardsActions from '../actions/boards.actions';
import { Board, Task, Column } from '../../models/boards.modal';

// Mock Data
const mockBoard: Board = {
  id: '1',
  name: 'Board 1',
  columns: [{ name: 'Column 1', tasks: [] }],
};

const mockTask: Task = {
  title: 'Task 1',
  description: 'Description 1',
  status: 'Column 1',
  subtasks: [],
};

describe('Boards Reducer', () => {
  it('should return the initial state when an unknown action is dispatched', () => {
    const action = {} as any;
    const state = boardsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loading boards data', () => {
    const boards = [mockBoard];
    const action = BoardsActions.loadBoardsData({ boards });
    const state = boardsReducer(initialState, action);

    expect(state.loaded).toBe(true);
    expect(state.entities[mockBoard.id]).toEqual(mockBoard);
    expect(state.ids.length).toBe(1);
  });

  it('should handle adding a new board', () => {
    const action = BoardsActions.addBoard({ board: mockBoard });
    const state = boardsReducer(initialState, action);

    expect(state.entities[mockBoard.id]).toEqual(mockBoard);
    expect(state.ids.length).toBe(1);
  });

  it('should handle selecting a board by index', () => {
    const action = BoardsActions.selectBoard({ index: 0 });
    const state = boardsReducer(initialState, action);

    expect(state.selectedBoardIndex).toBe(0);
  });

  it('should handle adding a task to a column', () => {
    const initialStateWithBoard = {
      ...initialState,
      selectedBoardIndex: 0, // Set a valid selectedBoardIndex
    };
  
    const stateWithBoard = adapter.addOne(mockBoard, initialStateWithBoard);
    const action = BoardsActions.addTaskToColumn({ task: mockTask, columnName: 'Column 1' });
    const state = boardsReducer(stateWithBoard, action);
  
    const updatedBoard = state.entities[mockBoard.id];
    const updatedColumn = updatedBoard?.columns.find((col) => col.name === 'Column 1');
    
    expect(updatedColumn?.tasks.length).toBe(1);
    expect(updatedColumn?.tasks[0].title).toBe(mockTask.title);
  });
  

  it('should handle adding a column to the selected board', () => {
    const initialStateWithBoard = {
      ...initialState,
      selectedBoardIndex: 0,
    };
    const stateWithBoard = adapter.addOne(mockBoard, initialStateWithBoard);
    const newColumn: Column = { name: 'New Column', tasks: [] };
    const action = BoardsActions.addColumnToBoard({ column: newColumn });
    const state = boardsReducer(stateWithBoard, action);

    const updatedBoard = state.entities[mockBoard.id];
    expect(updatedBoard?.columns.length).toBe(2);
    expect(updatedBoard?.columns[1].name).toBe('New Column');
  });

  it('should handle updating a task in the store', () => {
    const initialStateWithBoard = {
      ...initialState,
      selectedBoardIndex: 0, // Set a valid selectedBoardIndex
    };
  
    const stateWithBoard = adapter.addOne(mockBoard, initialStateWithBoard);
    const taskUpdate = { ...mockTask, title: 'Updated Task' };
    const action = BoardsActions.updateTaskInStore({ task: taskUpdate, originalTitle: mockTask.title });
    const state = boardsReducer(stateWithBoard, action);
  
    const updatedBoard = state.entities[mockBoard.id];
    const updatedColumn = updatedBoard?.columns.find((col) => col.name === mockTask.status);
  
    console.log('Updated Column:', updatedColumn); // Log the updated column to debug
    const updatedTask = updatedColumn?.tasks.find((task) => task.title === taskUpdate.title);
  
    console.log('Updated Task:', updatedTask); // Log the updated task to debug
  
    expect(updatedTask?.title).toBe('Updated Task');
  });
  
  

  it('should handle deleting a task from the store', () => {
    // Prepare state with a task in a column
    const stateWithBoardAndTask = boardsReducer(
      adapter.addOne(mockBoard, initialState),
      BoardsActions.addTaskToColumn({ task: mockTask, columnName: 'Column 1' })
    );

    const action = BoardsActions.deleteTaskFromStore({
      taskId: mockTask.title,
      columnName: 'Column 1',
    });
    const state = boardsReducer(stateWithBoardAndTask, action);

    const updatedBoard = state.entities[mockBoard.id];
    const updatedColumn = updatedBoard?.columns.find((col) => col.name === 'Column 1');
    
    expect(updatedColumn?.tasks.length).toBe(0); // Task should be deleted
  });

  it('should handle deleting a board', () => {
    const initialStateWithBoard = adapter.addOne(mockBoard, initialState);
    const action = BoardsActions.deleteBoard({ boardId: mockBoard.id });
    const state = boardsReducer(initialStateWithBoard, action);

    expect(state.entities[mockBoard.id]).toBeUndefined();
    expect(state.ids.length).toBe(0);
  });
});
