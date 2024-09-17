import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttonadd',
  templateUrl: './buttonadd.component.html',
  styleUrl: './buttonadd.component.css',
})
export class ButtonaddComponent {
  @Input() text: string = 'ButtonS';
  @Input() additionalClasses: string = '';
}
