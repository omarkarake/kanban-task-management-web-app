import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcolumnComponent } from './addcolumn.component';

describe('AddcolumnComponent', () => {
  let component: AddcolumnComponent;
  let fixture: ComponentFixture<AddcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddcolumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
