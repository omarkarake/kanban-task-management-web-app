import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SidebarLargeComponent } from './sidebar-large.component';
import { ThemeService } from '../../services/theme/theme.service';
import { ModalService } from '../../services/theme/modal/modal.service';
import { Store } from '@ngrx/store';
import { of, BehaviorSubject } from 'rxjs';
import { LargenavService } from '../../services/navigation/largenav.service';
import { selectBoard } from '../../store/actions/boards.actions';
import { By } from '@angular/platform-browser';

describe('SidebarLargeComponent', () => {
  let component: SidebarLargeComponent;
  let fixture: ComponentFixture<SidebarLargeComponent>;
  let mockThemeService: Partial<ThemeService>;
  let mockLargenavService: Partial<LargenavService>;
  let mockModalService: Partial<ModalService>;
  let mockStore: Partial<Store>;
  let mockHeaderSubject: BehaviorSubject<string>;

  beforeEach(async () => {
    // Mock the BehaviorSubject used by LargenavService
    mockHeaderSubject = new BehaviorSubject<string>('Initial Header');

    mockThemeService = {
      isDarkMode$: of(false),
      toggleTheme: jest.fn(),
    };

    mockModalService = {
      openModal: jest.fn(),
    };

    mockLargenavService = {
      header: mockHeaderSubject, // Use the BehaviorSubject here
    };

    mockStore = {
      select: jest.fn().mockReturnValue(of(['Board 1', 'Board 2'])), // Mock selectBoardNames
      dispatch: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [SidebarLargeComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: ModalService, useValue: mockModalService },
        { provide: LargenavService, useValue: mockLargenavService },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Run change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select an item and update state when selectItem is called', fakeAsync(() => {
    component.selectItem(0); // Simulate selecting the first board
    
    // Simulate the passage of time for asynchronous operations to complete
    tick();

    expect(mockLargenavService.header!.next).toHaveBeenCalledWith('Board 1'); // Ensure header is updated
    expect(mockStore.dispatch).toHaveBeenCalledWith(selectBoard({ index: 0 })); // Ensure the correct action is dispatched
  }));

  it('should open the add-board modal when the last item is selected', fakeAsync(() => {
    mockStore.select = jest.fn().mockReturnValue(of(['Board 1', 'Board 2', '+ Create New Board'])); // Mock store with + Create New Board
    component.selectItem(2); // Select the "Create New Board" option
    
    // Simulate the passage of time for asynchronous operations to complete
    tick();

    expect(mockModalService.openModal).toHaveBeenCalledWith('add-board'); // Ensure the add-board modal is opened
  }));

  it('should call toggleTheme on ThemeService when toggleDarkMode is called', () => {
    component.toggleDarkMode();
    expect(mockThemeService.toggleTheme).toHaveBeenCalled(); // Ensure the theme toggle is called
  });

  it('should emit toggleSideBar event when hideSidebar is called', () => {
    const spyEmit = jest.spyOn(component.toggleSideBar, 'emit'); // Spy on the EventEmitter
    component.hideSidebar(); // Call the method
    expect(spyEmit).toHaveBeenCalled(); // Ensure the event is emitted
  });
});
