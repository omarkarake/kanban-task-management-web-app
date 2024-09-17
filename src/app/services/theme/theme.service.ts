import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.darkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Detect system theme
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.setDarkMode(systemPrefersDark);

      // Listen for system theme changes
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          this.setDarkMode(event.matches);
        });
    }
  }

  private setDarkMode(isDark: boolean) {
    this.darkMode.next(isDark);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.toggle('dark', isDark);
    }
  }

  toggleTheme() {
    const newDarkMode = !this.darkMode.value;
    this.setDarkMode(newDarkMode);
  }
}
