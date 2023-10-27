import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';

import { isLightMode } from '#common/constants';
import { PersistanceService } from '#common/services';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  private readonly document: Document = inject(DOCUMENT);

  private isLightMode: boolean | null = inject(PersistanceService).get<boolean>(isLightMode);

  public injectThemeLink$(): Observable<HTMLLinkElement> {
    return this.themeLink$().pipe(
      take(1),
      tap((themeLink: HTMLLinkElement) => this.document.head.appendChild(themeLink))
    );
  }

  private themeLink$(): Observable<HTMLLinkElement> {
    const themeLink: HTMLLinkElement = this.document.createElement('link');
    themeLink.type = 'text/css';
    themeLink.rel = 'stylesheet';
    themeLink.href = this.isLightMode ? 'light-theme.css' : 'dark-theme.css';
    themeLink.id = 'theme-link';

    return of(themeLink);
  }
}
