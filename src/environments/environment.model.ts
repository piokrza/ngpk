export interface FirebaseConfig {
  projectId: string;
  appId: string;
  storageBucket: string;
  apiKey: string;
  authDomain: string;
  messagingSenderId: string;
  measurementId: string;
}

export interface FeatureFlags {
  drive: boolean;
  cashFlow: boolean;
  settings: boolean;
  tasker: boolean;
  overview: boolean;
  home: boolean;
}

export abstract class Environment {
  abstract firebase: FirebaseConfig;
  abstract weatherBaseUrl: string;
  abstract weatherApiKey: string;
  abstract uploadUrl: string;
  abstract production: boolean;
  abstract featureFlags: FeatureFlags;
}
