
export const environment = {
    production: true,
    mode: 'offline' as 'online' | 'offline',
    APP_ID: 'obj-market',
    APPP_SECRET_PUBLIC: '',
    authorzieUrl: 'https://mt9-oauth2-ui.firebaseapp.com/authorize?response_type=code&',
    productUrl: 'http://localhost:8111/product-svc',
    imageUrl: 'http://localhost:8111/file-upload-svc/files',
    getTokenUri: 'http://localhost:8111/auth-svc/oauth/token',
    oauthRedirectUri: 'https://mt7-obj-market.firebaseapp.com',
    profileUrl: 'http://localhost:8111/profile-svc',
  };
  
  