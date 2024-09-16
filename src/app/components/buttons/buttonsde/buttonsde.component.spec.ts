import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsdeComponent } from './buttonsde.component';

describe('ButtonsdeComponent', () => {
  let component: ButtonsdeComponent;
  let fixture: ComponentFixture<ButtonsdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsdeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
