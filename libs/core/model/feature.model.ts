import { Environment } from 'apps/organizer-client/src/environments';

export type Feature = keyof Environment['featureFlags'];
