import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationPhoneComponent } from './navigation-phone.component';
import { ThemeService } from '../../services/theme/theme.service';
import { ModalService } from '../../services/theme/modal/modal.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { selectBoard } from '../../store/actions/boards.actions';
import { By } from '@angular/platform-browser';

describe('NavigationPhoneComponent', () => {
  let component: NavigationPhoneComponent;
  let fixture: ComponentFixture<NavigationPhoneComponent>;
  let mockThemeService: Partial<ThemeService>;
  let mockModalService: Partial<ModalService>;
  let mockStore: Partial<Store>;

  beforeEach(async () => {
    mockThemeService = {
      isDarkMode$: of(false),
      toggleTheme: jest.fn(),
    };
    
    mockModalService = {
      openModal: jest.fn(),
    };
    
    mockStore = {
      select: jest.fn().mockReturnValue(of(['Board 1', 'Board 2'])), // Mock selectBoardNames
      dispatch: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [NavigationPhoneComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: ModalService, useValue: mockModalService },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Run initial change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the dropdown', () => {
    expect(component.dropDownOpen).toBe(false); // Initial state should be false

    component.toggleDropDown();
    fixture.detectChanges();
    expect(component.dropDownOpen).toBe(true); // After toggle, it should be true

    component.toggleDropDown();
    fixture.detectChanges();
    expect(component.dropDownOpen).toBe(false); // Toggle again should make it false
  });

  it('should toggle the ellipsis dropdown', () => {
    expect(component.dropDownActiveEllipsis).toBe(false); // Initial state should be false

    component.toggleDropDownEllipsis();
    fixture.detectChanges();
    expect(component.dropDownActiveEllipsis).toBe(true); // After toggle, it should be true

    component.toggleDropDownEllipsis();
    fixture.detectChanges();
    expect(component.dropDownActiveEllipsis).toBe(false); // Toggle again should make it false
  });

  it('should call toggleTheme on ThemeService when toggleDarkMode is called', () => {
    component.toggleDarkMode();
    expect(mockThemeService.toggleTheme).toHaveBeenCalled(); // Ensure the theme toggle is called
  });

  it('should open the correct modal when openModal is called', () => {
    component.openModal('add-board');
    expect(mockModalService.openModal).toHaveBeenCalledWith('add-board'); // Ensure the modal is opened

    component.openModal('edit-board');
    expect(mockModalService.openModal).toHaveBeenCalledWith('edit-board'); // Ensure the modal is opened
  });

  it('should dispatch the correct action when selectItem is called', () => {
    component.selectItem(0); // Simulate selecting the first board
    expect(mockStore.dispatch).toHaveBeenCalledWith(selectBoard({ index: 0 })); // Ensure the correct action is dispatched
  });

  it('should open the add-board modal when the last item is selected', () => {
    mockStore.select = jest.fn().mockReturnValue(of(['Board 1', 'Board 2', '+ Create New Board'])); // Mock store with + Create New Board
    component.selectItem(2); // Select the "Create New Board" option
    expect(mockModalService.openModal).toHaveBeenCalledWith('add-board'); // Ensure the add-board modal is opened
  });

  it('should select the edit option and open the edit-board modal', () => {
    component.selectOption('edit');
    expect(mockModalService.openModal).toHaveBeenCalledWith('edit-board'); // Ensure edit modal is opened
    expect(component.dropDownActiveEllipsis).toBe(false); // Ensure ellipsis dropdown is closed
  });

  it('should select the delete option and open the delete-board modal', () => {
    component.selectOption('delete');
    expect(mockModalService.openModal).toHaveBeenCalledWith('delete-board'); // Ensure delete modal is opened
    expect(component.dropDownActiveEllipsis).toBe(false); // Ensure ellipsis dropdown is closed
  });
});
