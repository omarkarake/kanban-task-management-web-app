import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-large',
  templateUrl: './sidebar-large.component.html',
  styleUrls: ['./sidebar-large.component.css'],
})
export class SidebarLargeComponent {
  items = ['Platform Launch', 'Other Item', 'Roadmap', '+ Create New Board'];
  selectedItemIndex: number = 0;

  selectItem(index: number): void {
    this.selectedItemIndex = index;
  }
}
