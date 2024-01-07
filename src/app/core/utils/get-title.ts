import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const getTitle = (title: string) => {
  return () => inject(TranslateService).instant(`menu.${title}`);
};
