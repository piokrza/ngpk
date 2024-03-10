import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin, map } from 'rxjs';

import { AppLanguage } from '#core/config/models';

export const lang = 'lang';

export function initializeTranslations() {
  const translateService = inject(TranslateService);
  const languages: Array<AppLanguage> = ['pl', 'en'];

  return () => {
    translateService.addLangs(languages);
    translateService.setDefaultLang('pl');

    return translateService.use(localStorage.getItem(lang) ?? 'pl');
  };
}

export class CustomTranslateHttpLoader implements TranslateLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string): Observable<object> {
    const requests = [`/assets/i18n/${lang}/auth.json`, `/assets/i18n/${lang}/common.json`, `/assets/i18n/${lang}/dashboard.json`].map(
      (url: string) => this.http.get<object>(url)
    );

    return forkJoin(requests).pipe(map((responses: object[]) => Object.assign({}, ...responses)));
  }
}
