import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isBrowser = true;
  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId)
  }
  get isDarkTheme() {
    if (this.isBrowser) {
      return getCookie('darkTheme') === 'true'
    } else {
      return (global as any).darkTheme === 'true';
    }
  }
  /**
   * localstorage for browser usage,
   * cookie for SSR usage
   */
  set isDarkTheme(next: boolean) {
    document.cookie = `darkTheme=${next}`
  }
}

function getCookie(name: string): string {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) { return parts.pop().split(';').shift(); }
}
