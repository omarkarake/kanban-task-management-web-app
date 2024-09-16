import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttonl',
  templateUrl: './buttonl.component.html',
  styleUrl: './buttonl.component.css',
})
export class ButtonlComponent {
  @Input() text: string = 'ButtonL';
  @Input() additionalClasses: string = '';
}
