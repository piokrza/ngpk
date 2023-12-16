import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { first, Observable, of, tap } from 'rxjs';

import { isLightMode } from '#common/constants';
import { PersistanceService } from '#common/services';

export function injectThemeLink$(themeInitService: ThemeInitService) {
  return () => themeInitService.injectThemeLink$();
}

@Injectable({ providedIn: 'root' })
export class ThemeInitService {
  private readonly document: Document = inject(DOCUMENT);

  private isLightMode: boolean = !!inject(PersistanceService).get<boolean>(isLightMode);

  public injectThemeLink$(): Observable<HTMLLinkElement> {
    return this.themeLink$.pipe(
      tap((themeLink: HTMLLinkElement) => this.document.head.appendChild(themeLink)),
      first()
    );
  }

  private get themeLink$(): Observable<HTMLLinkElement> {
    const themeLink: HTMLLinkElement = this.document.createElement('link');
    themeLink.type = 'text/css';
    themeLink.rel = 'stylesheet';
    themeLink.href = `${this.isLightMode ? 'light' : 'dark'}-theme.css`;
    themeLink.id = 'theme-link';

    return of(themeLink);
  }
}
