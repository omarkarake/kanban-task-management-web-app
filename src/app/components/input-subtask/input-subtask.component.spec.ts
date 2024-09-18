import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSubtaskComponent } from './input-subtask.component';

describe('InputSubtaskComponent', () => {
  let component: InputSubtaskComponent;
  let fixture: ComponentFixture<InputSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputSubtaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
