import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { LargenavService } from './services/navigation/largenav.service';
import { ModalService } from './services/theme/modal/modal.service';
import { BoardsService } from './services/boardsFetchData/boards.service';
import { Board, BoardsData, Column } from './models/boards.modal';
import { Store } from '@ngrx/store';
import {
  addBoard,
  loadBoardsData,
  selectBoard,
} from './store/actions/boards.actions';
import { Observable } from 'rxjs';
import {
  selectAllBoards,
  selectColumnsOfSelectedBoard,
} from './store/selectors/boards.selectors';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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

  constructor(
    private themeService: ThemeService,
    private largenavService: LargenavService,
    public modalService: ModalService,
    private boardsService: BoardsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.boardsService.getBoardsData().subscribe((data: BoardsData) => {
      // this.boardsData = data;
      console.log('fetched datas: ', data);
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
    
    // Subscribe to valueChanges and log the value
    this.inputForm.valueChanges.subscribe((value) => {
      console.log('Form value changes:', value);
    });
  }

  // Getter for the name form control
  get nameControl(): FormControl {
    return this.inputForm.get('name') as FormControl;
  }

  // Getter for the columns FormArray
  get columnsControl(): FormArray {
    return this.inputForm.get('columns') as FormArray;
  }

  // Getter to return a specific column as FormControl
  getColumnControl(index: number): FormControl {
    return this.columnsControl.at(index) as FormControl;
  }

  // Method to add a new column field
  addColumn(): void {
    this.columnsControl.push(new FormControl('', Validators.required));
  }

  // Method to remove a column by index
  removeColumn(index: number): void {
    this.columnsControl.removeAt(index);
  }

  // Submit form and add a new board to the store
  onSubmit(): void {
    console.log('Form submitted:', this.inputForm.value);
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
    } else {
      console.log('Form is invalid');
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

  // closeModal() {
  //   this.backDropFilterLarge = false;
  //   this.isViewTaskModalOpen = false;
  //   this.isAddTaskModalOpen = false;
  //   this.isEditTaskModalOpen = false;
  //   this.isAddBoardModalOpen = false;
  //   this.isEditBoardModalOpen = false;
  //   this.isDeleteBoardModalOpen = false;
  // }

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
}
