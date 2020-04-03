export const environment = {
  production: true,
  mode: 'online' as 'online' | 'offline',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  getTokenUri: 'http://api.manytreetechnology.com/auth-svc/oauth/token',
  oauthRedirectUri: 'http://shop.manytreetechnology.com/account',
  authorzieUrl: 'http://admin.manytreetechnology.com:8111/authorize?response_type=code&',
  profileUrl:'http://api.manytreetechnology.com/profile-svc',
  productUrl:'http://api.manytreetechnology.com/product-svc',
  imageUrl:'http://api.manytreetechnology.com/file-upload-svc/files',
};
