import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  headerHeight: number = 36;
  maxHeaderHeight: number = 36;
  minHeaderHeight: number = 0;
  constructor() { }
}
