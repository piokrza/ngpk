import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  private document: Document = inject(DOCUMENT);

  public injectThemeLink(): Observable<HTMLLinkElement> {
    return this.themeLink$().pipe(
      take(1),
      tap((link: HTMLLinkElement): void => {
        this.document.head.appendChild(link);
      })
    );
  }

  private themeLink$(): Observable<HTMLLinkElement> {
    const themeLink: HTMLLinkElement = this.document.createElement('link');
    themeLink.type = 'text/css';
    themeLink.rel = 'stylesheet';
    themeLink.href = 'light-theme.css';
    themeLink.id = 'theme-link';

    return of(themeLink);
  }
}
