import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() label: string = 'Dropdown';
  @Input() options: string[] = ['Todo', 'Doing', 'Done'];
  @Input() value?: string; // Mark value as optional
  @Input() control: FormControl = new FormControl(); // Form control to bind with reactive forms
  dropDownActive: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // If options are not provided, set default options
    if (this.options.length <= 0) {
      this.options = ['Todo', 'Doing', 'Done'];
    }

    // If value is not provided, set it to the first option
    if (!this.value) {
      this.value = this.options[0];
    }

    // Initialize the form control value with the selected value
    this.control.setValue(this.value);
  }

  selectOption(option: string) {
    this.value = option;
    this.control.setValue(option); // Update the form control value when an option is selected
    this.dropDownActive = false;
  }

  toggleDropDown() {
    this.dropDownActive = !this.dropDownActive;
  }
}
