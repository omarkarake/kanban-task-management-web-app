import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ModalService } from './services/theme/modal/modal.service';
import { BoardsService } from './services/boardsFetchData/boards.service';
import { ThemeService } from './services/theme/theme.service';
import { LargenavService } from './services/navigation/largenav.service';
import { of } from 'rxjs';
import { loadBoardsData, addBoard } from './store/actions/boards.actions';
import {
  selectAllBoards,
  selectColumnsOfSelectedBoard,
} from './store/selectors/boards.selectors';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockStore: MockStore; // Explicitly use MockStore
  let mockModalService: ModalService;
  let mockBoardsService: BoardsService;
  let mockThemeService: ThemeService;
  let mockLargenavService: LargenavService;

  const initialState = {
    boards: {
      entities: {
        '1': { id: '1', name: 'Board 1', columns: [] },
      },
      ids: ['1'],
      selectedBoardIndex: 0,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        provideMockStore({ initialState }), // Provide mock store with initial state
        {
          provide: ModalService,
          useValue: { openModal: jest.fn(), closeModal: jest.fn() },
        },
        {
          provide: BoardsService,
          useValue: { getBoardsData: jest.fn(() => of({ boards: [] })) },
        },
        { provide: ThemeService, useValue: { toggleTheme: jest.fn() } },
        {
          provide: LargenavService,
          useValue: { toggleIconLogo: { next: jest.fn() } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore); // Explicitly inject MockStore
    mockModalService = TestBed.inject(ModalService);
    mockBoardsService = TestBed.inject(BoardsService);
    mockThemeService = TestBed.inject(ThemeService);
    mockLargenavService = TestBed.inject(LargenavService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms correctly', () => {
    // Check that the forms are defined
    expect(component.inputForm).toBeDefined();
    expect(component.taskForm).toBeDefined();
    expect(component.columnForm).toBeDefined();

    // Check default form values
    expect(component.inputForm.get('name')?.value).toBe('');
    expect(component.taskForm.get('title')?.value).toBe('');
    expect(component.columnForm.get('name')?.value).toBe('');
  });

  it('should dispatch addBoard action when form is submitted', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set form values with null checks
    const nameControl = component.inputForm.get('name');
    const columnsControl = component.inputForm.get('columns');

    if (nameControl && columnsControl) {
      nameControl.setValue('New Board');
      component.addColumnForBoard(); // Add a column
      columnsControl.setValue(['Column 1']); // Set column value

      // Check if the form is valid before submission
      expect(component.inputForm.valid).toBeTruthy(); // Add this check for form validity

      // Submit the form
      component.onSubmit();

      // Check that the action is dispatched
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: '[Boards] Add Board',
        })
      );
    } else {
      fail('Form controls are not defined.');
    }
  });

  it('should dispatch addTaskToColumn action when task form is submitted', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set form values with null checks
    const titleControl = component.taskForm.get('title');
    const statusControl = component.taskForm.get('status');
    const subtasksControl = component.taskForm.get('subtasks');

    if (titleControl && statusControl && subtasksControl) {
      titleControl.setValue('New Task');
      statusControl.setValue('Column 1'); // Assuming status is column name
      component.addSubtask(); // Add a subtask
      subtasksControl.setValue(['Subtask 1']); // Set subtask

      // Check if the form is valid before submission
      expect(component.taskForm.valid).toBeTruthy(); // Add this check for form validity

      // Submit the form
      component.onSubmitTask();

      // Check that the action is dispatched
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: '[Boards] Add Task to Column',
        })
      );
    } else {
      fail('Form controls are not defined.');
    }
  });
  it('should open the add-task modal when openAddTaskModal is called', () => {
    component.openAddTaskModal();
    expect(mockModalService.openModal).toHaveBeenCalledWith('add-task');
  });
  it('should close the modal when closeModal is called', () => {
    component.closeModal();
    expect(mockModalService.closeModal).toHaveBeenCalled();
  });
  it('should dispatch updateTaskStatus action when task status is changed', () => {
    component.selectedTask = {
      title: 'Task 1',
      description: '',
      status: 'Todo',
      subtasks: [],
    };
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    component.onStatusChange('In Progress');

    // Verify the action dispatch
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[Boards] Update Task Status',
        taskId: 'Task 1',
        newStatus: 'In Progress',
      })
    );
  });
  it('should dispatch deleteBoard action when deleteBoard is called', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Mock selected board to delete
    const boardToDelete = { id: '1', name: 'Board 1', columns: [] };
    mockStore.setState({
      boards: {
        entities: { '1': boardToDelete },
        ids: ['1'],
        selectedBoardIndex: 0,
      },
    });

    // Call deleteBoard
    component.deleteBoard();

    // Verify the delete action was dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[Boards] Delete Board',
        boardId: '1',
      })
    );
  });
  it('should toggle theme when toggleTheme is called', () => {
    component.toggleTheme();
    expect(mockThemeService.toggleTheme).toHaveBeenCalled();
  });
  it('should dispatch addColumnToBoard action when column form is submitted', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set form values with null checks
    const columnNameControl = component.columnForm.get('name');

    if (columnNameControl) {
      columnNameControl.setValue('New Column');

      // Check if the form is valid before submission
      expect(component.columnForm.valid).toBeTruthy();

      // Submit the form to add a column
      component.onSubmitColumn();

      // Check that the action is dispatched
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: '[Boards] Add Column to Board',
        })
      );
    } else {
      fail('Column form controls are not defined.');
    }
  });
  it('should dispatch updateBoard action when board is updated', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Mock the selected board for editing
    const boardToEdit = {
      id: '1',
      name: 'Board 1',
      columns: [{ name: 'Column 1', tasks: [] }],
    };
    mockStore.setState({
      boards: {
        entities: { '1': boardToEdit },
        ids: ['1'],
        selectedBoardIndex: 0,
      },
    });

    component.selectedBoard$.subscribe((board) => {
      if (board) {
        // Populate edit board form
        component.populateEditBoardForm(board);
      }
    });

    // Update the form with new board data
    component.editBoardForm.get('name')?.setValue('Updated Board');
    component.editBoardForm.get('columns')?.setValue(['Updated Column']);

    // Submit the updated board
    component.onSubmitEditBoard();

    // Check that the action is dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[Boards] Update Board',
      })
    );
  });
  it('should dispatch updateTaskInStore action when task is edited', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set the selected task for editing
    component.selectedTask = {
      title: 'Task 1',
      description: 'Desc 1',
      status: 'Todo',
      subtasks: [],
    };

    // Populate the edit task form with the selected task
    component.populateEditTaskForm(component.selectedTask);

    // Update task fields
    component.editTaskForm.get('title')?.setValue('Updated Task');
    component.editTaskForm.get('description')?.setValue('Updated Description');
    component.editTaskForm.get('status')?.setValue('In Progress');

    // Submit the edited task
    component.onSubmitTaskEdit();

    // Check that the action is dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[Boards] Update Task In Store',
      })
    );
  });
  it('should dispatch deleteTaskFromStore action when task is deleted', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set the selected task to delete
    component.selectedTask = {
      title: 'Task 1',
      description: '',
      status: 'Todo',
      subtasks: [],
    };

    // Call the delete task method
    component.deleteTask();

    // Check that the action is dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[Boards] Delete Task From Store',
        taskId: 'Task 1',
        columnName: 'Todo',
      })
    );
  });

  it('should log error when no board is selected and addColumnToBoard is called', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Mock the state to have no selected board
    mockStore.setState({
      boards: {
        entities: { '1': { id: '1', name: 'Board 1', columns: [] } },
        ids: ['1'],
        selectedBoardIndex: null, // Simulate no board being selected
      },
    });

    // Call the method to add a column
    component.onSubmitColumn();

    // Check that the error was logged
    expect(consoleSpy).toHaveBeenCalledWith('No board selected');
    consoleSpy.mockRestore(); // Restore console
  });
  it('should dispatch addTaskToColumn action when task form is submitted', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set task form values
    const titleControl = component.taskForm.get('title');
    const statusControl = component.taskForm.get('status');
    const subtasksControl = component.taskForm.get('subtasks');

    if (titleControl && statusControl && subtasksControl) {
      titleControl.setValue('New Task');
      statusControl.setValue('Column 1'); // Assuming status is the column name
      component.addSubtask(); // Add a subtask
      subtasksControl.setValue(['Subtask 1']); // Set subtask value

      // Check if the form is valid before submission
      expect(component.taskForm.valid).toBeTruthy();

      // Submit the form to add the task
      component.onSubmitTask();

      // Expect the action to be dispatched
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: '[Boards] Add Task to Column',
        })
      );
    } else {
      fail('Task form controls are not defined.');
    }
  });
  it('should dispatch updateTaskInStore action when task is edited', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    // Set the selected task for editing
    component.selectedTask = {
      title: 'Task 1',
      description: 'Desc 1',
      status: 'Todo',
      subtasks: [],
    };

    // Populate the edit task form with the selected task data
    component.populateEditTaskForm(component.selectedTask);

    // Update task fields in the form
    component.editTaskForm.get('title')?.setValue('Updated Task');
    component.editTaskForm.get('description')?.setValue('Updated Description');
    component.editTaskForm.get('status')?.setValue('In Progress');

    // Submit the edited task form
    component.onSubmitTaskEdit();

    // Check that the action is dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: '[Boards] Update Task In Store',
      })
    );
  });
});
