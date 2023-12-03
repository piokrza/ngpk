import { Environment } from 'src/environments/environment.model';

export const environment: Environment = {
  firebase: {
    projectId: 'cash-control-3e6d6',
    appId: '1:811307138027:web:18466cad2a7edcf19eb7ae',
    storageBucket: 'cash-control-3e6d6.appspot.com',
    apiKey: 'AIzaSyC-rnkobDHdR-hZ5KioItptFDJ9M5iabbk',
    authDomain: 'cash-control-3e6d6.firebaseapp.com',
    messagingSenderId: '811307138027',
    measurementId: 'G-0TLBMDV7W7',
  },
  maxItemPerPage: 6,
  weatherBaseUrl: 'https://api.openweathermap.org/data/2.5/weather',
  weatherApiKey: '253353dc15d16c96be28e7780f4d500f',
  uploadUrl: 'https://www.primefaces.org/cdn/api/upload.php',
  production: false,
};
