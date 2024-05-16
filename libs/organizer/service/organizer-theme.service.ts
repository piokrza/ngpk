import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { ThemeType } from '@ngpk/organizer/model';
import { ConfigSelectors } from '@ngpk/organizer/state/config';

@Injectable({ providedIn: 'root' })
export class OrganizerThemeService {
  private readonly store = inject(Store);
  private readonly document: Document = inject(DOCUMENT);

  applyTheme$(): Observable<string> {
    return this.store.select(ConfigSelectors.theme).pipe(
      tap((theme: ThemeType) => {
        const link = this.getThemeLink(theme);
        this.document.head.appendChild(link);
      })
    );
  }

  private getThemeLink(themeType: ThemeType): HTMLLinkElement {
    const themeLink: HTMLLinkElement = this.document.createElement('link');
    themeLink.type = 'text/css';
    themeLink.rel = 'stylesheet';
    themeLink.href = `${themeType}-theme.css`;
    themeLink.id = 'theme-link';

    return themeLink;
  }
}
