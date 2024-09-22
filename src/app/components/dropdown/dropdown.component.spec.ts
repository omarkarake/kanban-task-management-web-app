import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { FormControl } from '@angular/forms';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(); // Provide the form control
    fixture.detectChanges(); // Run change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default options if none are provided', () => {
    expect(component.options).toEqual(['Todo', 'Doing', 'Done']);
  });

  it('should initialize with the first option if no value is set', () => {
    component.ngOnInit();
    expect(component.value).toBe('Todo');
    expect(component.control.value).toBe('Todo');
  });

  it('should set the value to the first option if no value is provided', (done) => {
    component.options = ['Option 1', 'Option 2', 'Option 3'];
    component.ngOnInit();
    setTimeout(() => {
      expect(component.value).toBe('Option 1');
      expect(component.control.value).toBe('Option 1');
      done();
    });
  });

  it('should set the selected option and emit event on selectOption', () => {
    const option = 'Doing';
    spyOn(component.selectionChange, 'emit');

    component.selectOption(option);

    expect(component.value).toBe(option);
    expect(component.control.value).toBe(option);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(option);
  });

  it('should toggle the dropDownActive state when toggleDropDown is called', () => {
    component.dropDownActive = false;
    component.toggleDropDown();
    expect(component.dropDownActive).toBe(true);

    component.toggleDropDown();
    expect(component.dropDownActive).toBe(false);
  });
});
