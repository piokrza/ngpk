import { Environment, FeatureFlags, FirebaseConfig } from 'src/environments';

class EnvironmentImpl implements Environment {
  firebase: FirebaseConfig = {
    appId: '1:731403343161:web:c3b3ae2f486b4d1bb384e8',
    authDomain: 'organizer-20ce6.firebaseapp.com',
    storageBucket: 'organizer-20ce6.appspot.com',
    projectId: 'organizer-20ce6',
    apiKey: 'AIzaSyD2c0-tW9kRahL_raHQI9dImxL-keO_zNg',
    messagingSenderId: '731403343161',
    measurementId: 'G-R3YVX64CVE',
  };
  featureFlags: FeatureFlags = {
    drive: true,
    cashFlow: true,
    settings: true,
    tasker: true,
    overview: true,
  };
  weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  weatherApiKey = '253353dc15d16c96be28e7780f4d500f';
  uploadUrl = 'https://www.primefaces.org/cdn/api/upload.php';
  production = true;
}

export const environment = new EnvironmentImpl();
