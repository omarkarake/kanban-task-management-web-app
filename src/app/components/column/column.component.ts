import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/theme/modal/modal.service';
import { Subtask, Task } from '../../models/boards.modal';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
})
export class ColumnComponent implements OnInit {
  // title can be: 'todo', 'doing', 'done'
  @Input() title: string = 'todo'; // Title of the column
  @Input() tasks: Task[] = []; // Tasks associated with the column
  subtasks: Subtask[] = []; // Subtasks associated with the task
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.tasks.forEach((task) => {
      this.subtasks.push(...task.subtasks);
    });

    // console.log("subtasks are: ", this.subtasks);
  }
  openModal() {
    this.modalService.openModal('view-task');
  }

  getCompletedSubtasksCount(task: Task): number {
    return task.subtasks ? task.subtasks.filter(subtask => subtask.isCompleted).length : 0;
  }

  getTotalSubtasksCount(task: Task): number {
    return task.subtasks ? task.subtasks.length : 0;
  }
}
