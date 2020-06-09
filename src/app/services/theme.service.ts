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
      if (localStorage.getItem('darkTheme') === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  set isDarkTheme(next: boolean) {
    localStorage.setItem('darkTheme', next + '')
  }
}
