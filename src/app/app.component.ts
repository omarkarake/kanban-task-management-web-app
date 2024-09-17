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
    this.backDropFilter = !this.backDropFilter;
  }

  toggleDropDownBackdropLarge() {
    this.backDropFilterLarge = !this.backDropFilterLarge;
  }
}
