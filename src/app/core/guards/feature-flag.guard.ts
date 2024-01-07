import { CanMatchFn } from '@angular/router';
import { environment } from 'src/environments/environment';

import { Feature } from '#core/models';

export function featureFlagGuard(featureName: Feature): CanMatchFn {
  return () => environment.featureFlags[featureName];
}
