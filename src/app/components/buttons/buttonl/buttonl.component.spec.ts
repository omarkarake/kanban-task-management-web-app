import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonlComponent } from './buttonl.component';

describe('ButtonlComponent', () => {
  let component: ButtonlComponent;
  let fixture: ComponentFixture<ButtonlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonlComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes to apply inputs
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display default text "ButtonL"', () => {
    expect(component.text).toBe('ButtonL');
  });

  it('should accept custom text as input', () => {
    component.text = 'Custom Text';
    fixture.detectChanges();
    expect(component.text).toBe('Custom Text');
  });

  it('should apply additional classes passed as input', () => {
    component.additionalClasses = 'btn-primary';
    fixture.detectChanges();
    expect(component.additionalClasses).toBe('btn-primary');
  });
});
