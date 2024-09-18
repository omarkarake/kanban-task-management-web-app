import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Observable } from 'rxjs';
import { LargenavService } from '../../services/navigation/largenav.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.css'],
})
export class SidebarLargeComponent {
  @Output() toggleSideBar = new EventEmitter<void>();
  items = [
    'Platform Launch',
    'Marketing Plan',
    'Roadmap',
    '+ Create New Board',
  ];
  selectedItemIndex: number = 0;
  isDarkMode: Observable<boolean> = this.themeService.isDarkMode$;
  constructor(
    private themeService: ThemeService,
    private largeNavService: LargenavService,
    private modalService: ModalService
  ) {}

  selectItem(index: number): void {
    if (index === this.items.length - 1) {
      this.modalService.openModal('add-board');
    } else {
      this.selectedItemIndex = index;
      this.largeNavService.header.next(this.items[index]);
    }
  }
  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }
  hideSidebar() {
    this.toggleSideBar.emit();
  }
}
