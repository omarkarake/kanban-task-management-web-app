import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { LargenavService } from './services/navigation/largenav.service';
import { ModalService } from './services/theme/modal/modal.service';
import { BoardsService } from './services/boardsFetchData/boards.service';
import { Board, BoardsData } from './models/boards.modal';
import { Store } from '@ngrx/store';
import { loadBoardsData } from './store/actions/boards.actions';
import { Observable } from 'rxjs';
import { selectAllBoards } from './store/selectors/boards.selectors';

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
    });

    // Select the data from the store
    this.boards$ = this.store.select(selectAllBoards);
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
