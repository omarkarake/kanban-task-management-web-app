import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtaskCheckboxComponent } from './subtask-checkbox.component';

describe('SubtaskCheckboxComponent', () => {
  let component: SubtaskCheckboxComponent;
  let fixture: ComponentFixture<SubtaskCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubtaskCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtaskCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
