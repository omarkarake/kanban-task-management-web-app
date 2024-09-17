import { LargenavService } from './../../services/navigation/largenav.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-large',
  templateUrl: './navigation-large.component.html',
  styleUrl: './navigation-large.component.css',
})
export class NavigationLargeComponent {
  header$ = this.largenavService.header$;
  constructor(private largenavService: LargenavService) {}
}
