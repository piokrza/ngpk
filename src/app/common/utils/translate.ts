import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LANG } from '#common/constants';
import { Language } from '#common/models';

export function initializeTranslations(translateService: TranslateService) {
  const languages: Array<Language['value']> = ['pl', 'en'];

  return () => {
    translateService.addLangs(languages);
    translateService.setDefaultLang('pl');

    return translateService.use(localStorage.getItem(LANG) ?? 'pl');
  };
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
