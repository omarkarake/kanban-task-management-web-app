import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() selectionChange = new EventEmitter<string>(); // Emit selection change
  dropDownActive: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.options.length <= 0) {
      this.options = ['Todo', 'Doing', 'Done'];
    }

    setTimeout(() => {
      if (!this.value) {
        this.value = this.options[0];
      }
      this.control.setValue(this.value);
    });
  }

  selectOption(option: string) {
    this.value = option;
    this.control.setValue(option); // Update the form control value when an option is selected
    this.selectionChange.emit(option); // Emit selected option
    this.dropDownActive = false;
  }

  toggleDropDown() {
    this.dropDownActive = !this.dropDownActive;
  }
}
