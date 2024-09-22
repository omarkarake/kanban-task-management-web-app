import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event and update state when closeModal is called', () => {
    component.isOpen = true; // Open the modal initially
    fixture.detectChanges(); // Detect changes after setting isOpen

    spyOn(component.close, 'emit'); // Spy on the close event emitter

    const modalOverlay = fixture.debugElement.query(By.css('.fixed')); // Select the modal overlay
    modalOverlay.triggerEventHandler('click', null); // Simulate a click on the overlay

    expect(component.isOpen).toBe(false); // Check if modal is closed
    expect(component.close.emit).toHaveBeenCalled(); // Ensure the close event was emitted
  });

  it('should render modal content when isOpen is true', () => {
    component.isOpen = true; // Set modal to open
    fixture.detectChanges(); // Trigger change detection to apply isOpen change

    const modalContent = fixture.debugElement.query(By.css('.relative')); // Select the modal content container
    expect(modalContent).not.toBeNull(); // Ensure modal content is rendered
  });

  it('should not render modal content when isOpen is false', () => {
    component.isOpen = false; // Ensure modal is closed
    fixture.detectChanges(); // Run change detection

    const modalContent = fixture.debugElement.query(By.css('.relative')); // Select modal content container
    expect(modalContent).toBeNull(); // Modal content should not be rendered
  });
});
