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
      return getCookie('darkTheme') === 'true'
    } else {
      return global['darkTheme'] === 'true';
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
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
