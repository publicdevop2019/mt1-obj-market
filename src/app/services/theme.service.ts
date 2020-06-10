import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isBrowser: boolean = true;
  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId)
  }
  get isDarkTheme() {
    if (this.isBrowser) {
      return localStorage.getItem('darkTheme') === 'true'
    } else {
      return global['darkTheme'] === 'true';
    }
  }
  /**
   * localstorage for browser usage,
   * cookie for SSR usage
   */
  set isDarkTheme(next: boolean) {
    localStorage.setItem('darkTheme', next + '');
    document.cookie = `darkTheme=${next}`
  }
}
