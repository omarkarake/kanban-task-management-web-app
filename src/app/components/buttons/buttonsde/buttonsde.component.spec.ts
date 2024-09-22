import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonsdeComponent } from './buttonsde.component';

describe('ButtonsdeComponent', () => {
  let component: ButtonsdeComponent;
  let fixture: ComponentFixture<ButtonsdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsdeComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes to apply inputs
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display default text "ButtonDe"', () => {
    expect(component.text).toBe('ButtonDe');
  });

  it('should accept custom text as input', () => {
    component.text = 'Custom Text';
    fixture.detectChanges();
    expect(component.text).toBe('Custom Text');
  });

  it('should apply additional classes passed as input', () => {
    component.additionalClasses = 'btn-secondary';
    fixture.detectChanges();
    expect(component.additionalClasses).toBe('btn-secondary');
  });
});
