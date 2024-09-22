import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonseComponent } from './buttonse.component';

describe('ButtonseComponent', () => {
  let component: ButtonseComponent;
  let fixture: ComponentFixture<ButtonseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonseComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display default text "ButtonS"', () => {
    expect(component.text).toBe('ButtonS');
  });

  it('should accept custom text as input', () => {
    component.text = 'Submit';
    fixture.detectChanges();
    expect(component.text).toBe('Submit');
  });

  it('should apply additional classes passed as input', () => {
    component.additionalClasses = 'btn-danger';
    fixture.detectChanges();
    expect(component.additionalClasses).toBe('btn-danger');
  });

  it('should accept custom type as input', () => {
    component.type = 'submit';
    fixture.detectChanges();
    expect(component.type).toBe('submit');
  });
});
