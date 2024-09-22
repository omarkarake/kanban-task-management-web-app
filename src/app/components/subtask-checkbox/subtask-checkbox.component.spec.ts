import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubtaskCheckboxComponent } from './subtask-checkbox.component';
import { By } from '@angular/platform-browser';

describe('SubtaskCheckboxComponent', () => {
  let component: SubtaskCheckboxComponent;
  let fixture: ComponentFixture<SubtaskCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubtaskCheckboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Run change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial isChecked value', () => {
    component.isChecked = false; // Ensure default state
    fixture.detectChanges();
    
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')); // Assuming it's an input element with type checkbox
    expect(checkbox.nativeElement.checked).toBe(false); // Ensure unchecked by default
  });

  it('should toggle isChecked state when toggleCheck is called', () => {
    component.isChecked = false; // Initial state
    component.toggleCheck();
    fixture.detectChanges();

    expect(component.isChecked).toBe(true); // isChecked should be true after toggle
  });

  it('should emit checkboxToggled event when checkbox is toggled', () => {
    spyOn(component.checkboxToggled, 'emit'); // Spy on the emit function

    component.isChecked = false;
    component.toggleCheck(); // Simulate toggle
    fixture.detectChanges();

    expect(component.checkboxToggled.emit).toHaveBeenCalledWith(true); // Expect emit with true
  });

  it('should render the correct title', () => {
    component.title = 'Test Subtask'; // Set title
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('label')); // Assuming title is within a label
    expect(titleElement.nativeElement.textContent).toContain('Test Subtask'); // Ensure title is rendered correctly
  });
});
