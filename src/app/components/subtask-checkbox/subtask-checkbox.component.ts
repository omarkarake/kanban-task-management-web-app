import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-subtask-checkbox',
  templateUrl: './subtask-checkbox.component.html',
  styleUrl: './subtask-checkbox.component.css',
})
export class SubtaskCheckboxComponent {
  @Input() additionCss: string = '';
  @Input() isChecked: boolean = false;
  constructor() {}
  toggleCheck() {
    this.isChecked = !this.isChecked;
  }
}
