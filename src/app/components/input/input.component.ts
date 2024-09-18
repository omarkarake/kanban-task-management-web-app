import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() label: string = 'Text Field (Idle)';
  @Input() placeholder: string = 'Placeholder';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() error: boolean = false;
}
