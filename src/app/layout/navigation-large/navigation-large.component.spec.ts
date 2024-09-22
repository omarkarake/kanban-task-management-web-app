import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationLargeComponent } from './navigation-large.component';
import { LargenavService } from './../../services/navigation/largenav.service';
import { ThemeService } from '../../services/theme/theme.service';
import { ModalService } from '../../services/theme/modal/modal.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('NavigationLargeComponent', () => {
  let component: NavigationLargeComponent;
  let fixture: ComponentFixture<NavigationLargeComponent>;
  let mockLargenavService: Partial<LargenavService>;
  let mockThemeService: Partial<ThemeService>;
  let mockModalService: Partial<ModalService>;

  beforeEach(async () => {
    mockLargenavService = {
      header$: of('Header Test'),
      togoLogo$: of(true),
    };
    
    mockThemeService = {
      isDarkMode$: of(true),
    };
    
    mockModalService = {
      openModal: jest.fn(), // Mock modal service method
    };

    await TestBed.configureTestingModule({
      declarations: [NavigationLargeComponent],
      providers: [
        { provide: LargenavService, useValue: mockLargenavService },
        { provide: ThemeService, useValue: mockThemeService },
        { provide: ModalService, useValue: mockModalService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Run change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the dropdown', () => {
    expect(component.dropDownActive).toBe(false); // Initial state should be false

    component.toggleDropDown();
    fixture.detectChanges();
    expect(component.dropDownActive).toBe(true); // After toggle, it should be true

    component.toggleDropDown();
    fixture.detectChanges();
    expect(component.dropDownActive).toBe(false); // Toggle again should make it false
  });

  it('should select the edit option and open the edit-board modal', () => {
    component.selectOption('edit'); // Call the function with 'edit'
    expect(mockModalService.openModal).toHaveBeenCalledWith('edit-board'); // Verify modal is opened
    expect(component.dropDownActive).toBe(false); // Dropdown should be closed after selection
  });

  it('should select the delete option and open the delete-board modal', () => {
    component.selectOption('delete'); // Call the function with 'delete'
    expect(mockModalService.openModal).toHaveBeenCalledWith('delete-board'); // Verify modal is opened
    expect(component.dropDownActive).toBe(false); // Dropdown should be closed after selection
  });

  it('should open a modal when openModal is called', () => {
    component.openModal('add-task'); // Simulate opening a modal
    expect(mockModalService.openModal).toHaveBeenCalledWith('add-task'); // Verify modal is opened
  });

  it('should emit openModalForAddTask event when openModalForAddTask is emitted', () => {
    const spyEmit = jest.spyOn(component.openModalForAddTask, 'emit'); // Spy on the EventEmitter

    component.openModalForAddTask.emit(); // Trigger the event manually
    fixture.detectChanges();

    expect(spyEmit).toHaveBeenCalled(); // Verify event emission
  });
});
