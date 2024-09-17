import { Component, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buttonadd',
  templateUrl: './buttonadd.component.html',
  styleUrl: './buttonadd.component.css',
})
export class ButtonaddComponent {
  @Input() text: string = 'ButtonS';
  @Input() additionalClasses: string = '';
  isDarkMode: Observable<boolean> = this.themeService.isDarkMode$;
  constructor(private themeService: ThemeService) {}
}
