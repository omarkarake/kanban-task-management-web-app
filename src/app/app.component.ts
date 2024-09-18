import { Component } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { LargenavService } from './services/navigation/largenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  layoutSideBarOpen: boolean = false;
  backDropFilter: boolean = false;
  backDropFilterLarge: boolean = false;

  isViewTaskModalOpen: boolean = false;
  isAddTaskModalOpen: boolean = false;
  isEditTaskModalOpen: boolean = false;
  isAddBoardModalOpen: boolean = false;
  isEditBoardModalOpen: boolean = false;
  isDeleteBoardModalOpen: boolean = false;

  constructor(
    private themeService: ThemeService,
    private largenavService: LargenavService
  ) {}

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

  openModal(modalType: string) {
    this.backDropFilterLarge = true;
    switch (modalType) {
      case 'view-task':
        this.isViewTaskModalOpen = true;
        break;
      case 'add-task':
        this.isAddTaskModalOpen = true;
        break;
      case 'edit-task':
        this.isEditTaskModalOpen = true;
        break;
      case 'add-board':
        this.isAddBoardModalOpen = true;
        break;
      case 'edit-board':
        this.isEditBoardModalOpen = true;
        break;
      case 'delete-board':
        this.isDeleteBoardModalOpen = true;
        break;
      default:
        break;
    }
  }

  closeModal() {
    this.backDropFilterLarge = false;
    this.isViewTaskModalOpen = false;
    this.isAddTaskModalOpen = false;
    this.isEditTaskModalOpen = false;
    this.isAddBoardModalOpen = false;
    this.isEditBoardModalOpen = false;
    this.isDeleteBoardModalOpen = false;
  }

  openModalForAddTask() {
    this.openModal('add-task');
  }
}
