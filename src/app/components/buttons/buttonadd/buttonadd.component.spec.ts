import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonaddComponent } from './buttonadd.component';

describe('ButtonaddComponent', () => {
  let component: ButtonaddComponent;
  let fixture: ComponentFixture<ButtonaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonaddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
