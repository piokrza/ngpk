import { Environment } from 'src/environments/environment.model';

export const environment: Environment = {
  firebase: {
    apiKey: 'AIzaSyD2c0-tW9kRahL_raHQI9dImxL-keO_zNg',
    authDomain: 'organizer-20ce6.firebaseapp.com',
    projectId: 'organizer-20ce6',
    storageBucket: 'organizer-20ce6.appspot.com',
    messagingSenderId: '731403343161',
    appId: '1:731403343161:web:c3b3ae2f486b4d1bb384e8',
    measurementId: 'G-R3YVX64CVE',
  },
  weatherBaseUrl: 'https://api.openweathermap.org/data/2.5/weather',
  weatherApiKey: '253353dc15d16c96be28e7780f4d500f',
  uploadUrl: 'https://www.primefaces.org/cdn/api/upload.php',
  production: false,
  featureFlags: {
    drive: true,
    cashFlow: true,
    settings: true,
    tasker: true,
    overview: true,
  },
};
