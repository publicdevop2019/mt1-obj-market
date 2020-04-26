
export const environment = {
  production: true,
  mode: 'online' as 'online' | 'offline',
  APP_ID: 'obj-market',
  APPP_SECRET_PUBLIC: '',
  authorzieUrl: 'http://localhost:4300/authorize?response_type=code&',
  productUrl: 'http://localhost:8111/product-svc',
  imageUrl: 'http://localhost:8111/file-upload-svc/files',
  getTokenUri: 'http://localhost:8111/auth-svc/oauth/token',
  oauthRedirectUri: 'http://localhost:4200',
  profileUrl: 'http://localhost:8111/profile-svc',
};

