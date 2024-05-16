import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Environment } from 'apps/organizer-client/src/environments';
import { BehaviorSubject, Observable, filter, tap } from 'rxjs';

import { OrganizerPaths } from '@ngpk/organizer/enum';

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
    if (url.includes(OrganizerPaths.DRIVE)) this.setTitle('drive');
    if (url.includes(OrganizerPaths.TASKER)) this.setTitle('tasker');
    if (url.includes(OrganizerPaths.SETTINGS)) this.setTitle('settings');
    if (url.includes(OrganizerPaths.CASH_FLOW)) this.setTitle('cashFlow');
    if (url.includes(OrganizerPaths.AUTHENTICATION)) this.setTitle('auth');
  }
}
