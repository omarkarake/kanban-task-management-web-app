import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonlComponent } from './buttonl.component';

describe('ButtonlComponent', () => {
  let component: ButtonlComponent;
  let fixture: ComponentFixture<ButtonlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
