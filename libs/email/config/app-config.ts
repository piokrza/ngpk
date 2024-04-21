import { InjectionToken } from '@angular/core';
import { environment } from 'apps/email-client/src/environments/environment';

import { AppConfig } from '@ngpk/email/model';

export const APP_SERVICE_CONFIG: InjectionToken<AppConfig> = new InjectionToken<AppConfig>('app-config');

export const appConfig: AppConfig = {
  BASE_URL: environment.BASE_URL,
};
