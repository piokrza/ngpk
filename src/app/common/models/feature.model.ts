import { Environment } from 'src/environments';

export type Feature = keyof Environment['featureFlags'];
