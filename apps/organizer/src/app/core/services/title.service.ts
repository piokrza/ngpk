import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';
import { Environment } from 'src/environments';

import { AppPaths } from '#core/enums';

@Injectable({ providedIn: 'root' })
export class TitleService {
  constructor(private readonly router: Router) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        tap((event) => this.handleTitle(event.url))
      )
      .subscribe();
  }

  private readonly title$$ = new BehaviorSubject<string>('');
  readonly title$: Observable<string> = this.title$$.asObservable();

  private setTitle(title: keyof Environment['featureFlags']): void {
    this.title$$.next(`menu.${title}`);
  }

  private handleTitle(url: string): void {
    if (!url.length) this.setTitle('home');
    if (url.includes(AppPaths.DRIVE)) this.setTitle('drive');
    if (url.includes(AppPaths.TASKER)) this.setTitle('tasker');
    if (url.includes(AppPaths.SETTINGS)) this.setTitle('settings');
    if (url.includes(AppPaths.CASH_FLOW)) this.setTitle('cashFlow');
    if (url.includes(AppPaths.AUTHENTICATION)) this.setTitle('auth');
  }
}
