import { ModalService } from '../../services/theme/modal/modal.service';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme/theme.service';
import { LargenavService } from './../../services/navigation/largenav.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-large',
  templateUrl: './navigation-large.component.html',
  styleUrl: './navigation-large.component.css',
})
export class NavigationLargeComponent {
  @Output() openModalForAddTask = new EventEmitter<void>();
  header$ = this.largenavService.header$;
  toggleLogo$ = this.largenavService.togoLogo$;
  dropDownActive: boolean = false;
  isDarkMode: Observable<boolean> = this.themeService.isDarkMode$;
  constructor(
    private largenavService: LargenavService,
    private themeService: ThemeService,
    private modalService: ModalService
  ) {}
  toggleDropDown(): void {
    this.dropDownActive = !this.dropDownActive;
  }
  selectOption(option: string): void {
    if (option === 'edit') {
      this.modalService.openModal('edit-board');
    } else if (option === 'delete') {
      this.modalService.openModal('delete-board');
    }

    // Close the dropdown after selection
    this.toggleDropDown();
  }

  openModal(modalType: string) {
    // this.openModalForAddTask.emit();
    this.modalService.openModal(modalType);
  }
}
