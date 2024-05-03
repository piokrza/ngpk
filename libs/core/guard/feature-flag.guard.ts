import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Environment } from 'apps/organizer-client/src/environments';

import { Feature } from '@ngpk/core/model';

export function featureFlagGuard(featureName: Feature): CanMatchFn {
  return () => inject(Environment).featureFlags[featureName];
}
