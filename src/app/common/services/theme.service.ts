import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PersistanceService } from '@common/services/persistance.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _themeLink: HTMLLinkElement;

  constructor(@Inject(DOCUMENT) private document: Document, private persistanceService: PersistanceService) {
    this._themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;
  }

  public setTheme(isLightMode: boolean): void {
    this._themeLink.href = isLightMode ? 'light-theme.css' : 'dark-theme.css';
    this.persistanceService.set('isLightMode', isLightMode);
  }
}
