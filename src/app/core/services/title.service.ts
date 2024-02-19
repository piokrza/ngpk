import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from 'src/environments';

@Injectable({ providedIn: 'root' })
export class TitleService {
  private readonly title$$ = new BehaviorSubject<string>('');

  get title$(): Observable<string> {
    return this.title$$.asObservable();
  }

  setTitle(title: keyof Environment['featureFlags']): void {
    this.title$$.next(`menu.${title}`);
  }
}
