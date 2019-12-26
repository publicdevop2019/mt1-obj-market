
export const environment = {
  production: false,
  mode: 'online' as 'online' | 'offline',
  getTokenUri: 'https://www.ngform.com/oauth/token',
  oauthRedirectUri: 'http://localhost:4200/account',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  authorzieUrl: 'https://oauth2service-c00b3.firebaseapp.com/authorize?response_type=code&',
  profileUrl:'https://www.ngform.com',
  // profileUrl:'http://localhost:8083/v1',
  productUrl:'https://www.ngform.com'
  // productUrl:'http://localhost:8084/v1',
};
import 'zone.js/dist/zone-error';  // Included with Angular CLI.import { NgModel } from '@angular/forms';

