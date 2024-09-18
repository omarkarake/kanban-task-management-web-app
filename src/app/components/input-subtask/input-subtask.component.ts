import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-subtask',
  templateUrl: './input-subtask.component.html',
  styleUrl: './input-subtask.component.css'
})
export class InputSubtaskComponent {
  @Input() placeholder: string = 'Placeholder';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() error: boolean = false;
}
