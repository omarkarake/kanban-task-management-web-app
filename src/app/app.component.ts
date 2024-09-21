import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { LargenavService } from './services/navigation/largenav.service';
import { ModalService } from './services/theme/modal/modal.service';
import { BoardsService } from './services/boardsFetchData/boards.service';
import { Board, BoardsData, Column, Task } from './models/boards.modal';
import { Store } from '@ngrx/store';
import {
  addBoard,
  addColumnToBoard,
  addTaskToColumn,
  deleteBoard,
  loadBoardsData,
  selectBoard,
  updateBoard,
  updateSubtaskInTask,
  updateTaskStatus,
} from './store/actions/boards.actions';
import { combineLatest, first, map, Observable, of, switchMap } from 'rxjs';
import {
  selectAllBoards,
  selectBoardById,
  selectColumnsOfSelectedBoard,
  selectIds,
  selectSelectedBoardIndex,
} from './store/selectors/boards.selectors';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  layoutSideBarOpen: boolean = false;
  backDropFilter: boolean = false;
  backDropFilterLarge: boolean = false;

  isViewTaskModalOpen: boolean = false;
  isAddTaskModalOpen: boolean = false;
  isEditTaskModalOpen: boolean = false;
  isAddBoardModalOpen: boolean = false;
  isEditBoardModalOpen: boolean = false;
  isDeleteBoardModalOpen: boolean = false;

  dropDownActive: boolean = false;
  boards$!: Observable<Board[]>;
  boardsData!: BoardsData;
  columns$!: Observable<Column[]>;
  inputForm!: FormGroup;
  taskForm!: FormGroup;
  columnForm!: FormGroup;

  columnsNames$!: Observable<string[]>;

  selectedTask!: Task; // Store the selected task

  editBoardForm!: FormGroup; // Form for editing board
  selectedBoard$!: Observable<Board | undefined>; // Observable for the selected board
  selectedBoardIndex$!: Observable<number | null>; // Store the index of selected board

  constructor(
    private themeService: ThemeService,
    private largenavService: LargenavService,
    public modalService: ModalService,
    private boardsService: BoardsService,
    private store: Store,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.boardsService.getBoardsData().subscribe((data: BoardsData) => {
      // this.boardsData = data;
      // console.log('fetched datas: ', data);
      this.store.dispatch(loadBoardsData({ boards: data.boards }));
      // Dispatch an action to select the first board by default
      if (data.boards.length > 0) {
        this.store.dispatch(selectBoard({ index: 0 }));
      }
    });

    // Select the data from the store
    this.boards$ = this.store.select(selectAllBoards);

    // Select the columns of the selected board from the store
    this.columns$ = this.store.select(selectColumnsOfSelectedBoard);

    this.columns$.subscribe((columns) => {
      console.log('Selected columns in app: ', columns);
    });

    this.inputForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      columns: new FormArray([]),
    });

    this.taskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      status: new FormControl('', [Validators.required]), // This will be the column ID where the task is added
      subtasks: new FormArray([]),
    });

    this.columnForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    // Subscribe to valueChanges and log the value
    this.inputForm.valueChanges.subscribe((value) => {
      // console.log('Form value changes:', value);
    });

    this.taskForm.valueChanges.subscribe((value) => {
      // console.log('Task form value changes:', value);
    });

    this.columnForm.valueChanges.subscribe((value) => {
      // console.log('Column form value changes:', value);
    });

    // Get selected board index and board IDs as observables
    this.selectedBoardIndex$ = this.store.select(selectSelectedBoardIndex);
    const boardIds$ = this.store.select(selectIds);

    // Combine selectedBoardIndex$ and boardIds$
    this.selectedBoard$ = combineLatest([
      this.selectedBoardIndex$,
      boardIds$,
    ]).pipe(
      switchMap(([index, ids]) => {
        if (index !== null && ids.length > 0) {
          const boardId = ids[index]; // Get the board ID based on the index
          return this.store.select(selectBoardById(boardId as string)); // Select board by ID
        } else {
          return of(undefined); // Return undefined if no board is selected
        }
      })
    );

    // Subscribe to the selectedBoard$ observable and log the result
    this.selectedBoard$.subscribe((board) => {
      // console.log('Selected board in app afterview:', board);
    });

    // Subscribe to the selected board and populate the form when it changes
    this.selectedBoard$.subscribe((board) => {
      if (board) {
        this.populateEditBoardForm(board);
      }
    });

    // Initialize the form
    this.editBoardForm = this.fb.group({
      name: ['', [Validators.required]],
      columns: this.fb.array([]), // We'll populate this array dynamically
    });

    this.editBoardForm.valueChanges.subscribe((value) => {
      // console.log('Edit board form value changes:', value);
    });

    this.columnsNames$ = this.selectedBoard$.pipe(
      map((board) => {
        if (board) {
          return board.columns.map((col) => col.name);
        } else {
          return [];
        }
      })
    );

    this.columnsNames$.subscribe((columns) => {
      console.log('Selected columns:', columns);
    });

    // this.selectedBoard$.subscribe((board) => {
    //   if (board) {
    //     const columnsNames: string[] = board.columns.map((col) => col.name);
    //     console.log('Selected board:', columnsNames);
    //   }
    // });
  }

  ngAfterViewInit(): void {}
  // getter for the name form control for the column
  get columnNameControl(): FormControl {
    return this.columnForm.get('name') as FormControl;
  }

  onStatusChange(newStatus: string) {
    if (this.selectedTask) {
      // Dispatch an action to update the task's status in the store
      this.store.dispatch(updateTaskStatus({
        taskId: this.selectedTask.title, // assuming taskId is the title, or replace it with a proper taskId field if available
        newStatus: newStatus
      }));
    }
  }

  // Method to open the task modal and log the task
  openTaskModal(task: Task): void {
    this.selectedTask = task; // Set the selected task
    console.log('Selected task:', task); // Log the selected task to the console
    this.modalService.openModal('view-task'); // Open the modal
  }

  // Getter to calculate completed subtasks count
  get completedSubtasksCount(): number {
    if (!this.selectedTask || !this.selectedTask.subtasks) {
      return 0;
    }
    return this.selectedTask.subtasks.filter((subtask) => subtask.isCompleted)
      .length;
  }

  // Getter to calculate total subtasks count
  get totalSubtasksCount(): number {
    if (!this.selectedTask || !this.selectedTask.subtasks) {
      return 0;
    }
    return this.selectedTask.subtasks.length;
  }

  // Getter for the name form control
  get nameControl(): FormControl {
    return this.inputForm.get('name') as FormControl;
  }

  // Getter for the columns FormArray
  get columnsControl(): FormArray {
    return this.inputForm.get('columns') as FormArray;
  }

  // Getter for name control for edit board
  get nameControlForEditBoard(): FormControl {
    return this.editBoardForm.get('name') as FormControl;
  }

  // Getter for columns array for edit board
  get columnsControlForEditBoard(): FormArray {
    return this.editBoardForm.get('columns') as FormArray;
  }

  // Getter to return a specific column as FormControl
  getColumnControl(index: number): FormControl {
    return this.columnsControl.at(index) as FormControl;
  }

  // Method to add a new column field
  addColumn(): void {
    this.modalService.openModal('add-column');
  }

  // Method to remove a column by index
  removeColumn(index: number): void {
    this.columnsControl.removeAt(index);
  }

  // Add new column control
  addColumnForEditBoard(): void {
    this.columnsControlForEditBoard.push(
      this.fb.control('', Validators.required)
    );
  }

  addColumnForBoard(): void {
    this.columnsControl.push(this.fb.control('', Validators.required));
  }

  // Remove column control
  removeColumnForEditBoard(index: number): void {
    this.columnsControlForEditBoard.removeAt(index);
  }

  // Get individual column controls
  getColumnControlForEditBoard(index: number): FormControl {
    return this.columnsControlForEditBoard.at(index) as FormControl;
  }

  // Populate form with selected board data
  populateEditBoardForm(board: Board): void {
    this.editBoardForm.patchValue({
      name: board.name,
    });

    // Clear columns form array before adding new ones
    this.columnsControlForEditBoard.clear();

    board.columns.forEach((column) => {
      this.columnsControlForEditBoard.push(
        this.fb.control(column.name, Validators.required)
      );
    });
  }

  // Method to handle subtask toggle
  onSubtaskToggled(subtaskIndex: number, currentState: boolean): void {
    // Clone the task and update the specific subtask's isCompleted state
    const updatedSubtasks = this.selectedTask.subtasks.map((subtask, index) =>
      index === subtaskIndex
        ? { ...subtask, isCompleted: !currentState }
        : subtask
    );

    // Dispatch an action to update the subtask in the store
    this.store.dispatch(
      updateSubtaskInTask({
        taskId: this.selectedTask.title,
        updatedSubtasks: updatedSubtasks,
      })
    );
  }

  // Submit the updated board
  onSubmitEditBoard(): void {
    if (this.editBoardForm.valid) {
      const updatedBoard = {
        ...this.editBoardForm.value,
        columns: this.columnsControlForEditBoard.value.map(
          (columnName: string) => ({
            name: columnName,
            tasks: [], // We are not updating tasks here, just column names
          })
        ),
      };

      this.store.dispatch(updateBoard({ board: updatedBoard }));
      this.modalService.closeModal();
    }
  }

  // Submit form and add a new board to the store
  onSubmit(): void {
    // console.log('Form submitted:', this.inputForm.value);
    if (this.inputForm.valid) {
      const newBoard = {
        id: uuidv4(), // Generate unique ID
        name: this.nameControl.value,
        columns: this.columnsControl.value.map((col: string) => ({
          name: col,
          tasks: [], // Initialize with empty tasks
        })),
      };

      // Dispatch the action to add the new board to the store
      this.store.dispatch(addBoard({ board: newBoard }));

      // Reset the form after submission
      this.inputForm.reset();
      this.columnsControl.clear(); // Clear the columns array
      this.closeModal();
    } else {
      // console.log('Form is invalid');
    }
  }

  // Getter for the title form control
  get titleControl(): FormControl {
    return this.taskForm.get('title') as FormControl;
  }

  get descriptionControl(): FormControl {
    return this.taskForm.get('description') as FormControl;
  }

  get statusControl(): FormControl {
    return this.taskForm.get('status') as FormControl;
  }

  // Getter for the subtasks FormArray
  get subtasksControl(): FormArray {
    return this.taskForm.get('subtasks') as FormArray;
  }

  // Getter to return a specific subtask as FormControl
  getSubtaskControl(index: number): FormControl {
    return this.subtasksControl.at(index) as FormControl;
  }

  // Method to add a new subtask field
  addSubtask(): void {
    this.subtasksControl.push(new FormControl('', Validators.required));
  }

  // Method to remove a subtask by index
  removeSubtask(index: number): void {
    this.subtasksControl.removeAt(index);
  }

  // Submit form and add a new task to the column
  onSubmitTask(): void {
    if (this.taskForm.valid) {
      const newTask = {
        title: this.taskForm.get('title')?.value,
        description: this.taskForm.get('description')?.value,
        status: this.taskForm.get('status')?.value,
        subtasks: this.taskForm
          .get('subtasks')
          ?.value.map((subtask: string) => ({
            title: subtask,
            isCompleted: false, // Initialize with false
          })),
      };

      // Dispatch the action to add the new task to the specified column
      this.store.dispatch(
        addTaskToColumn({
          task: newTask,
          columnName: this.taskForm.get('status')?.value, // Using the status field to get column name
        })
      );

      // Reset the form after submission
      this.taskForm.reset();
      (this.taskForm.get('subtasks') as FormArray).clear(); // Clear the subtasks array
      this.closeModal();
    } else {
      // console.log('Form is invalid');
    }
  }

  // Submit form and add a new column to the selected board
  onSubmitColumn(): void {
    if (this.columnForm.valid) {
      const newColumn: Column = {
        name: this.columnNameControl.value,
        tasks: [], // Initialize with empty tasks
      };

      // Dispatch the action to add the column to the selected board
      this.store.dispatch(addColumnToBoard({ column: newColumn }));

      // Reset the form after submission
      this.columnForm.reset();
      this.closeModal();
    } else {
      // console.log('Form is invalid');
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  triggerSideBar() {
    this.layoutSideBarOpen = !this.layoutSideBarOpen;
    this.largenavService.toggleIconLogo.next(this.layoutSideBarOpen);
  }

  toggleDropDownBackdrop() {
    // this.backDropFilter = !this.backDropFilter; // toggling backdrop filter
  }

  toggleDropDownBackdropLarge() {
    // this.backDropFilterLarge = !this.backDropFilterLarge;
  }

  // Function to open the 'add-task' modal
  openAddTaskModal() {
    this.modalService.openModal('add-task');
  }

  // Function to close the modal
  closeModal() {
    this.modalService.closeModal();
  }

  toggleDropDown(): void {
    this.dropDownActive = !this.dropDownActive;
  }

  selectOption(option: string): void {
    if (option === 'edit') {
      this.modalService.openModal('edit-task');
    } else if (option === 'delete') {
      this.modalService.openModal('delete-task');
    }

    // Close the dropdown after selection
    this.toggleDropDown();
  }

  deleteBoard(): void {
    // Subscribe only once to the selectedBoard$
    this.selectedBoard$.pipe(first()).subscribe((board) => {
      if (board) {
        console.log('Selected board ID to delete:', board.id); // Debug log to ensure correct ID
        this.store.dispatch(deleteBoard({ boardId: board.id }));
        this.modalService.closeModal(); // Close the modal after deletion
      }
    });
  }
}
