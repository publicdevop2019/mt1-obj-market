
export const environment = {
  production: false,
  mode: 'online' as 'online' | 'offline',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  getTokenUri: 'http://www.ngform.com:8111/oauth/token',
  oauthRedirectUri: 'http://www.ngform.com/account',
  authorzieUrl: 'https://www.ngform.com:8081',
  profileUrl:'http://www.ngform.com:8111',
  productUrl:'http://www.ngform.com:8111',
  imageUrl:'http://www.ngform.com:8111/files',
  // authorzieUrl: 'http://oauth2service-c00b3.firebaseapp.com/authorize?response_type=code&',
  // getTokenUri: 'http://localhost:8111/oauth/token',
  // profileUrl:'http://localhost:8111',
  // productUrl:'http://localhost:8111',
  // imageUrl:'http://localhost:8111/api/files',
};
import 'zone.js/dist/zone-error';  // Included with Angular CLI.import { NgModel } from '@angular/forms';

