import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonseComponent } from './buttonse.component';

describe('ButtonseComponent', () => {
  let component: ButtonseComponent;
  let fixture: ComponentFixture<ButtonseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
