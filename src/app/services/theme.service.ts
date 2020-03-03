import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  get isDarkTheme() {
    if (localStorage.getItem('darkTheme') === 'true') {
      return true;
    } else {
      return false;
    }
  }
  set isDarkTheme(next: boolean) {
    localStorage.setItem('darkTheme', next + '')
  }
}
