import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public async injectThemeLink(): Promise<void> {
    return lastValueFrom(this.createThemeLink$()).then((link: HTMLLinkElement): void => {
      this.document.head.appendChild(link);
    });
  }

  private createThemeLink$(): Observable<HTMLLinkElement> {
    const themeLink: HTMLLinkElement = this.document.createElement('link');
    themeLink.type = 'text/css';
    themeLink.rel = 'stylesheet';
    themeLink.href = 'light.css';
    themeLink.id = 'theme-link';

    return of(themeLink);
  }
}
