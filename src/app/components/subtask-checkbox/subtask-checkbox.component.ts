import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subtask-checkbox',
  templateUrl: './subtask-checkbox.component.html',
  styleUrls: ['./subtask-checkbox.component.css'],
})
export class SubtaskCheckboxComponent {
  @Input() title: string = '';
  @Input() additionCss: string = '';
  @Input() isChecked: boolean = false;

  // Emit an event when the checkbox is toggled
  @Output() checkboxToggled = new EventEmitter<boolean>();

  toggleCheck() {
    this.isChecked = !this.isChecked;
    this.checkboxToggled.emit(this.isChecked); // Emit the new state
  }
}