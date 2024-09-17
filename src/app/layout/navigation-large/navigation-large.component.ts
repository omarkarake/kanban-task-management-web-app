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
  header$ = this.largenavService.header$;
  toggleLogo$ = this.largenavService.togoLogo$;
  dropDownActive: boolean = false;
  isDarkMode: Observable<boolean> = this.themeService.isDarkMode$;
  @Output() toggleDropDownBackdropLarge = new EventEmitter<void>();
  constructor(
    private largenavService: LargenavService,
    private themeService: ThemeService
  ) {}
  toggleDropDown(): void {
    this.dropDownActive = !this.dropDownActive;
    this.toggleDropDownBackdropLarge.emit();
  }
  selectOption(option: string): void {
    if (option === 'edit') {
      // Handle edit board logic here
      console.log('Edit Board selected');
    } else if (option === 'delete') {
      // Handle delete board logic here
      console.log('Delete Board selected');
    }

    // Close the dropdown after selection
    this.toggleDropDown();
  }
}
