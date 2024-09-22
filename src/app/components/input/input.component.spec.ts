import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule, ReactiveFormsModule], // Import necessary modules
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(); // Provide the form control for testing
    fixture.detectChanges(); // Run change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should write value to input field', () => {
    component.writeValue('Test Input');
    fixture.detectChanges();
    expect(component.value).toBe('Test Input');
    expect(component.control.value).toBe('Test Input');
  });

  it('should call onChange when input value changes', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    
    const inputElement: HTMLInputElement | null = fixture.nativeElement.querySelector('input');
    expect(inputElement).not.toBeNull(); // Ensure input element exists

    if (inputElement) {
      inputElement.value = 'New Value';
      inputElement.dispatchEvent(new Event('input'));
    }

    expect(onChangeSpy).toHaveBeenCalledWith('New Value');
    expect(component.value).toBe('New Value');
    expect(component.control.value).toBe('New Value');
  });

  it('should call onTouched when input is touched', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);

    const inputElement: HTMLInputElement | null = fixture.nativeElement.querySelector('input');
    expect(inputElement).not.toBeNull(); // Ensure input element exists

    if (inputElement) {
      inputElement.dispatchEvent(new Event('blur'));
    }

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should disable or enable the input field', () => {
    if (component && component.setDisabledState) {
      component.setDisabledState(true);
    }
    fixture.detectChanges();
    expect(component.control.disabled).toBe(true);

    if (component.setDisabledState) {
      component.setDisabledState(false);
    }
    fixture.detectChanges();
    expect(component.control.disabled).toBe(false);
  });
});
