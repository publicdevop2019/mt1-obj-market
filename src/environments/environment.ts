
export const environment = {
  production: false,
  mode: 'online' as 'online' | 'offline',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  // getTokenUri: 'http://www.ngform.com:8111/oauth/token',
  // oauthRedirectUri: 'http://localhost:4200/account',
  // authorzieUrl: 'http://www.ngform.com:8081/authorize?response_type=code&',
  // profileUrl:'http://www.ngform.com:8111',
  // productUrl:'http://www.ngform.com:8111',
  // imageUrl:'http://www.ngform.com:8111/api/files',
  getTokenUri: 'http://localhost:8111/oauth/token',
  oauthRedirectUri: 'http://localhost:4200/account',
  authorzieUrl: 'http://localhost:4300/authorize?response_type=code&',
  profileUrl:'http://localhost:8111',
  productUrl:'http://localhost:8111',
  imageUrl:'http://localhost:8111/api/files',
};
import 'zone.js/dist/zone-error';  // Included with Angular CLI.import { NgModel } from '@angular/forms';

