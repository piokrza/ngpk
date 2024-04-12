import { InjectionToken } from '@angular/core';
import { environment } from 'apps/email-client/src/environments/environment';

import { config } from '@ngpk/email/enum';
import { AppConfig } from '@ngpk/email/model';

export const APP_SERVICE_CONFIG: InjectionToken<AppConfig> = new InjectionToken<AppConfig>(config.APP_CONFIG);

export const appConfig: AppConfig = {
  BASE_URL: environment.BASE_URL,
};
