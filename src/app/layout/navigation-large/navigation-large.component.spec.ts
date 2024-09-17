import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationLargeComponent } from './navigation-large.component';

describe('NavigationLargeComponent', () => {
  let component: NavigationLargeComponent;
  let fixture: ComponentFixture<NavigationLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationLargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
