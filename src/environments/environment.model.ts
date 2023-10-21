export interface Environment {
  firebase: {
    projectId: string;
    appId: string;
    storageBucket: string;
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
    measurementId: string;
  };
  production: boolean;
}
