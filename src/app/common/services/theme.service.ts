import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { isLightMode } from '#common/constants';
import { PersistanceService } from '#common/services';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeLink: HTMLLinkElement;

  public constructor(@Inject(DOCUMENT) private document: Document, private persistanceService: PersistanceService) {
    this.themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;
  }

  public setTheme(isLightModeFlag: boolean | null): void {
    this.themeLink.href = isLightModeFlag ? 'light-theme.css' : 'dark-theme.css';
    this.persistanceService.set(isLightMode, isLightModeFlag);
  }
}
