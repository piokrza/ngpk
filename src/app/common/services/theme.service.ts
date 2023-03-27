import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PersistanceService } from '@common/services/persistance.service';
import { isLightMode } from '@common/constants/is-light-mode';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _themeLink: HTMLLinkElement;

  constructor(@Inject(DOCUMENT) private document: Document, private persistanceService: PersistanceService) {
    this._themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;
  }

  public setTheme(isLightModeFlag: boolean): void {
    this._themeLink.href = isLightModeFlag ? 'light-theme.css' : 'dark-theme.css';
    this.persistanceService.set(isLightMode, isLightModeFlag);
  }
}
