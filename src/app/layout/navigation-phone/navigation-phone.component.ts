import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation-phone',
  templateUrl: './navigation-phone.component.html',
  styleUrl: './navigation-phone.component.css',
})
export class NavigationPhoneComponent {
  @Output() toggleDropDownBackdrop = new EventEmitter<void>();
  items = ['Platform Launch', 'Other Item', 'Roadmap', '+ Create New Board'];
  selectedItemIndex: number = 0;
  isDarkMode: Observable<boolean> = this.themeService.isDarkMode$;
  dropDownOpen: boolean = false;
  dropDownActiveEllipsis: boolean = false;

  constructor(private themeService: ThemeService) {}

  selectItem(index: number): void {
    this.selectedItemIndex = index;
    this.dropDownOpen = false;
  }
  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }
  toggleDropDown(): void {
    this.dropDownOpen = !this.dropDownOpen;
    this.toggleDropDownBackdrop.emit();
  }
  toggleDropDownEllipsis(): void {
    this.dropDownActiveEllipsis = !this.dropDownActiveEllipsis;
    this.toggleDropDownBackdrop.emit();
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
    this.toggleDropDownEllipsis();
  }
}
