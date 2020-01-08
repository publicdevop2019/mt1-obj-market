
export const environment = {
  production: false,
  mode: 'online' as 'online' | 'offline',
  oauthRedirectUri: 'http://localhost:4200/account',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  // getTokenUri: 'https://www.ngform.com/oauth/token',
  // authorzieUrl: 'https://oauth2service-c00b3.firebaseapp.com/authorize?response_type=code&',
  // profileUrl:'https://www.ngform.com',
  // productUrl:'https://www.ngform.com'
  getTokenUri: 'http://localhost:8111/oauth/token',
  authorzieUrl: 'http://localhost:4300/authorize?response_type=code&',
  profileUrl:'http://localhost:8111',
  productUrl:'http://localhost:8111',
  // profileUrl:'http://localhost:8083/v1',
  // productUrl:'http://localhost:8084/v1',
};
import 'zone.js/dist/zone-error';  // Included with Angular CLI.import { NgModel } from '@angular/forms';

