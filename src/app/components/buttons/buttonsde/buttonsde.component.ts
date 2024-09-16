import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttonsde',
  templateUrl: './buttonsde.component.html',
  styleUrl: './buttonsde.component.css',
})
export class ButtonsdeComponent {
  @Input() text: string = 'ButtonDe';
  @Input() additionalClasses: string = '';
}
