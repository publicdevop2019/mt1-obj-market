
export const environment = {
  production: false,
  mode: 'online' as 'online' | 'offline',
  oauthRedirectUri: 'http://localhost:4200/account',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  getTokenUri: 'http://www.ngform.com/oauth/token',
  // authorzieUrl: 'http://oauth2service-c00b3.firebaseapp.com/authorize?response_type=code&',
  profileUrl:'http://www.ngform.com',
  productUrl:'http://www.ngform.com',
  imageUrl:'http://www.ngform.com/api/files',
  // getTokenUri: 'http://localhost:8111/oauth/token',
  authorzieUrl: 'http://localhost:4300/authorize?response_type=code&',
  // profileUrl:'http://localhost:8111',
  // productUrl:'http://localhost:8111',
  // imageUrl:'http://localhost:8111/api/files',
};
import 'zone.js/dist/zone-error';  // Included with Angular CLI.import { NgModel } from '@angular/forms';

