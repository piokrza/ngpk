import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Environment } from 'src/environments';

import { Feature } from '#core/models';

export function featureFlagGuard(featureName: Feature): CanMatchFn {
  return () => inject(Environment).featureFlags[featureName];
}
