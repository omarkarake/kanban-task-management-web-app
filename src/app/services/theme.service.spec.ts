import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect system dark mode preference', (done) => {
    service.isDarkMode$.subscribe(isDark => {
      expect(isDark).toBe(true);
      done();
    });
  });

  it('should toggle theme', (done) => {
    service.toggleTheme();
    service.isDarkMode$.subscribe(isDark => {
      expect(isDark).toBe(false);
      done();
    });
  });
});
