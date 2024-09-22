import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSubtaskComponent } from './input-subtask.component';

describe('InputSubtaskComponent', () => {
  let component: InputSubtaskComponent;
  let fixture: ComponentFixture<InputSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputSubtaskComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Run change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct default placeholder value', () => {
    expect(component.placeholder).toBe('Placeholder');
  });

  it('should allow setting a custom placeholder', () => {
    component.placeholder = 'Enter subtask';
    fixture.detectChanges();
    const inputElement: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    expect(inputElement.placeholder).toBe('Enter subtask');
  });

  it('should render error message when error is true', () => {
    component.error = true; // Set error to true
    fixture.detectChanges(); // Run change detection

    const errorMessage = fixture.nativeElement.querySelector('p.text-body-l');
    expect(errorMessage).not.toBeNull(); // Ensure error message is rendered
    expect(errorMessage.textContent).toContain('Can’t be empty'); // Ensure correct message is displayed
  });

  it('should not display error message when error is false', () => {
    component.error = false;
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeNull(); // Ensure no error message is shown
  });
});
