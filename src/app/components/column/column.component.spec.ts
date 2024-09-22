import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnComponent } from './column.component';
import { ModalService } from '../../services/theme/modal/modal.service';
import { AppComponent } from '../../app.component';
import { Subtask, Task } from '../../models/boards.modal';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;
  let mockModalService: Partial<ModalService>;
  let mockAppComponent: Partial<AppComponent>;

  beforeEach(async () => {
    // Mock ModalService and AppComponent
    mockModalService = {
      // Add any methods you'd like to mock if needed
    };

    mockAppComponent = {
      openTaskModal: jest.fn() // Mock the openTaskModal method
    };

    await TestBed.configureTestingModule({
      declarations: [ ColumnComponent ],
      providers: [
        { provide: ModalService, useValue: mockModalService },
        { provide: AppComponent, useValue: mockAppComponent }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty subtasks array', () => {
    expect(component.subtasks).toEqual([]);
  });

  it('should populate subtasks from tasks on ngOnInit', () => {
    const mockSubtasks: Subtask[] = [
      { title: 'Subtask 1', isCompleted: false },
      { title: 'Subtask 2', isCompleted: true }
    ];

    const mockTasks: Task[] = [
      { title: 'Task 1', description: 'Test task', status: 'todo', subtasks: mockSubtasks }
    ];

    component.tasks = mockTasks;
    component.ngOnInit();

    expect(component.subtasks).toEqual(mockSubtasks);
  });

  it('should open task modal when a task is clicked', () => {
    const mockTask: Task = { title: 'Task 1', description: 'Test task', status: 'todo', subtasks: [] };

    component.openTaskModal(mockTask);

    expect(mockAppComponent.openTaskModal).toHaveBeenCalledWith(mockTask);
  });

  it('should return the count of completed subtasks', () => {
    const mockTask: Task = {
      title: 'Task 1',
      description: 'Test task',
      status: 'todo',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: false }
      ]
    };

    const completedCount = component.getCompletedSubtasksCount(mockTask);
    expect(completedCount).toBe(1);
  });

  it('should return the total count of subtasks', () => {
    const mockTask: Task = {
      title: 'Task 1',
      description: 'Test task',
      status: 'todo',
      subtasks: [
        { title: 'Subtask 1', isCompleted: true },
        { title: 'Subtask 2', isCompleted: false }
      ]
    };

    const totalCount = component.getTotalSubtasksCount(mockTask);
    expect(totalCount).toBe(2);
  });
});
