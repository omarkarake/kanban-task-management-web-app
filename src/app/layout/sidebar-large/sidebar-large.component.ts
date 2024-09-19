import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LargenavService } from '../../services/navigation/largenav.service';
import { ModalService } from '../../services/theme/modal/modal.service';
import { Store } from '@ngrx/store';
import { selectBoardNames } from '../../store/selectors/boards.selectors';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.css'],
})
export class SidebarLargeComponent implements OnInit {
  @Output() toggleSideBar = new EventEmitter<void>();
  items$: Observable<string[]>;
  selectedItemIndex: number = 0;
  isDarkMode: Observable<boolean> = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
    private largeNavService: LargenavService,
    private modalService: ModalService,
    private store: Store
  ) {
    this.items$ = this.store.select(selectBoardNames).pipe(
      map(items => [...items, '+ Create New Board'])
    );
  }

  ngOnInit(): void {}

  selectItem(index: number): void {
    this.items$.subscribe(items => {
      if (index === items.length - 1) {
        this.modalService.openModal('add-board');
      } else {
        this.selectedItemIndex = index;
        this.largeNavService.header.next(items[index]);
      }
    }).unsubscribe();
  }

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }

  hideSidebar() {
    this.toggleSideBar.emit();
  }
}