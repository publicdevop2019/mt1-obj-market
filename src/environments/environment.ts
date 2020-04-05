
export const environment = {
  production: false,
  mode: 'online' as 'online' | 'offline',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  // getTokenUri: 'http://admin.manytreetechnology.com:8111/oauth/token',
  // oauthRedirectUri: 'http://localhost:4200/account',
  authorzieUrl: 'http://localhost:4300/authorize?response_type=code&',
  // profileUrl:'http://admin.manytreetechnology.com:8111',
  productUrl:'http://localhost:8111/product-svc',
  imageUrl:'http://localhost:8111/file-upload-svc/files',
  getTokenUri: 'http://localhost:8111/auth-svc/oauth/token',
  oauthRedirectUri: 'http://localhost:4200/account',
  // authorzieUrl: 'http://localhost:4300/authorize?response_type=code&',
  profileUrl:'http://localhost:8111/profile-svc',
  // productUrl:'http://localhost:8111',
  // imageUrl:'http://localhost:8111/api/files',
};
import 'zone.js/dist/zone-error';  // Included with Angular CLI.import { NgModel } from '@angular/forms';

