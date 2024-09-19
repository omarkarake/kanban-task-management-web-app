import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { map, Observable } from 'rxjs';
import { ModalService } from '../../services/theme/modal/modal.service';
import { Store } from '@ngrx/store';
import { selectBoardNames } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-navigation-phone',
  templateUrl: './navigation-phone.component.html',
  styleUrl: './navigation-phone.component.css',
})
export class NavigationPhoneComponent {
  items$: Observable<string[]>;
  selectedItemIndex: number = 0;
  isDarkMode: Observable<boolean> = this.themeService.isDarkMode$;
  dropDownOpen: boolean = false;
  dropDownActiveEllipsis: boolean = false;

  constructor(
    private themeService: ThemeService,
    private modalService: ModalService,
    private store: Store
  ) {
    this.items$ = this.store
      .select(selectBoardNames)
      .pipe(map((items) => [...items, '+ Create New Board']));
  }

  selectItem(index: number): void {
    this.items$
      .subscribe((items) => {
        if (index === items.length - 1) {
          this.modalService.openModal('add-board');
          this.dropDownOpen = false;
        } else {
          this.selectedItemIndex = index;
          this.dropDownOpen = false;
        }
      })
      .unsubscribe();
  }

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }
  toggleDropDown(): void {
    this.dropDownOpen = !this.dropDownOpen;
  }
  toggleDropDownEllipsis(): void {
    this.dropDownActiveEllipsis = !this.dropDownActiveEllipsis;
  }

  openModal(modalType: string) {
    // this.openModalForAddTask.emit();
    this.modalService.openModal(modalType);
  }

  selectOption(option: string): void {
    if (option === 'edit') {
      this.modalService.openModal('edit-board');
    } else if (option === 'delete') {
      this.modalService.openModal('delete-board');
    }
    this.toggleDropDownEllipsis();
  }
}
