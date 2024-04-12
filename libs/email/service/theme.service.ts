import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  setTheme(isLightMode: boolean): void {
    const themeLink = this.document.getElementById('theme-link') as HTMLLinkElement;
    themeLink.href = isLightMode ? 'light.css' : 'dark.css';
    localStorage.setItem('isLightMode', JSON.stringify(isLightMode));
  }
}
