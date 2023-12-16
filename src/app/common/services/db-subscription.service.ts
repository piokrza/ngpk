import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DbSubscriptionService {
  private readonly unsubscribe$$ = new Subject<void>();

  public get unsubscribe$(): Observable<void> {
    return this.unsubscribe$$.asObservable();
  }

  public unsubscribe(): void {
    this.unsubscribe$$.next();
  }
}
