import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonaddComponent } from './buttonadd.component';
import { ThemeService } from '../../../services/theme/theme.service';
import { of } from 'rxjs'; // to simulate observables

describe('ButtonaddComponent', () => {
  let component: ButtonaddComponent;
  let fixture: ComponentFixture<ButtonaddComponent>;
  let mockThemeService: Partial<ThemeService>; // Adjust to Jest

  beforeEach(async () => {
    // Create a mock of the ThemeService with Jest
    mockThemeService = {
      isDarkMode$: of(true), // Mocking dark mode observable with true
    };

    await TestBed.configureTestingModule({
      declarations: [ ButtonaddComponent ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Run change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default text input value', () => {
    expect(component.text).toBe('ButtonS');
  });

  it('should accept custom text as input', () => {
    component.text = 'Custom Text';
    fixture.detectChanges();
    expect(component.text).toBe('Custom Text');
  });

  it('should handle dark mode observable from ThemeService', (done) => {
    component.isDarkMode.subscribe(isDark => {
      expect(isDark).toBeTruthy(); // Expect the mocked value to be `true`
      done(); // Use done callback to handle async
    });
  });
});
