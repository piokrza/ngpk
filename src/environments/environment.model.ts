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
  maxItemPerPage: number;
  weatherBaseUrl: string;
  weatherApiKey: string;
  uploadUrl: string;
  production: boolean;
  featureFlags: {
    drive: boolean;
    cashFlow: boolean;
    settings: boolean;
    tasker: boolean;
    web3: boolean;
    overview: boolean;
  };
}
