export const environment = {
  production: true,
  mode: 'online' as 'online' | 'offline',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  getTokenUri: 'http://api.manytreetechnology.com:8111/auth-svc/oauth/token',
  oauthRedirectUri: 'http://shop.manytreetechnology.com/account',
  authorzieUrl: 'http://api.manytreetechnology.com/authorize?response_type=code&',
  profileUrl:'http://api.manytreetechnology.com:8111/profile-svc',
  productUrl:'http://api.manytreetechnology.com:8111/product-svc',
  imageUrl:'http://api.manytreetechnology.com:8111/file-upload-svc/files',
};
