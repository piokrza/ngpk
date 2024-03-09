import { Environment } from 'apps/organizer/src/environments';

export type Feature = keyof Environment['featureFlags'];
