import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.css'],
})
export class SidebarLargeComponent {
  items = ['Platform Launch', 'Other Item', 'Roadmap', '+ Create New Board'];
  selectedItemIndex: number = 0;
  isDarkMode: Observable<boolean> = this.themeService.isDarkMode$;
  constructor(private themeService: ThemeService) {}

  selectItem(index: number): void {
    this.selectedItemIndex = index;
  }
  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }
}
