import { LargenavService } from './../../services/navigation/largenav.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-large',
  templateUrl: './navigation-large.component.html',
  styleUrl: './navigation-large.component.css',
})
export class NavigationLargeComponent {
  header$ = this.largenavService.header$;
  dropDownActive: boolean = false;
  constructor(private largenavService: LargenavService) {}
  toggleDropDown(): void {
    this.dropDownActive = !this.dropDownActive;
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
