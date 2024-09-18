import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent {
  // title can be: 'todo', 'doing', 'done'
  @Input() title: string = 'done';
  @Input() tasks: string[] = ['Task 1', 'Task 2'];
  constructor(private modalService: ModalService) {}
  openModal() {
    this.modalService.openModal('view-task');
  }
}
