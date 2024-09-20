import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttonse',
  templateUrl: './buttonse.component.html',
  styleUrl: './buttonse.component.css',
})
export class ButtonseComponent {
  @Input() text: string = 'ButtonS';
  @Input() additionalClasses: string = '';
  @Input() type: string = '';
}
