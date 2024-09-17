import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLargeComponent } from './sidebar-large.component';

describe('SidebarLargeComponent', () => {
  let component: SidebarLargeComponent;
  let fixture: ComponentFixture<SidebarLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarLargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
