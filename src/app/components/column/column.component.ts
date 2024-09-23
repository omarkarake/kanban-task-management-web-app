import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/theme/modal/modal.service';
import { Subtask, Task } from '../../models/boards.modal';
import { AppComponent } from '../../app.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { updateTaskStatus } from '../../store/actions/boards.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() title: string = 'todo'; // Title of the column
  @Input() tasks: Task[] = []; // Tasks associated with the column
  subtasks: Subtask[] = [];

  constructor(
    private modalService: ModalService,
    private parentComponent: AppComponent,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.tasks.forEach((task) => {
      this.subtasks.push(...task.subtasks);
    });
  }

  // Handle the task drop event
  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // If dropped in the same container, reorder the array immutably
      const updatedTasks = [...event.container.data];
      moveItemInArray(updatedTasks, event.previousIndex, event.currentIndex);
      
      // Assign the updated tasks array immutably
      this.tasks = updatedTasks;
    } else {
      // If dropped in a different container, transfer the task immutably
      const prevTasks = [...event.previousContainer.data];
      const currentTasks = [...event.container.data];
      const task = prevTasks[event.previousIndex];
  
      transferArrayItem(prevTasks, currentTasks, event.previousIndex, event.currentIndex);
      
      // Assign the updated tasks arrays immutably
      this.tasks = currentTasks;
  
      // Dispatch action to update the task's status (column name) immutably
      this.store.dispatch(updateTaskStatus({
        taskId: task.title, // or another unique ID for the task
        newStatus: this.title // Set the new column's title as the new status
      }));
    }
  }

  getCompletedSubtasksCount(task: Task): number {
    return task.subtasks ? task.subtasks.filter(subtask => subtask.isCompleted).length : 0;
  }

  getTotalSubtasksCount(task: Task): number {
    return task.subtasks ? task.subtasks.length : 0;
  }

  openTaskModal(task: Task) {
    this.parentComponent.openTaskModal(task);
  }
}
