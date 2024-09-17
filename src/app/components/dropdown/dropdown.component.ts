import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input() label: string = 'Dropdown';
  @Input() options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  @Input() value: string = this.options[0];
  dropDownActive: boolean = false;
  constructor() {}
  selectOption(option: string) {
    this.value = option;
    this.dropDownActive = false;
  }
  toggleDropDown() {
    this.dropDownActive = !this.dropDownActive;
  }
}
