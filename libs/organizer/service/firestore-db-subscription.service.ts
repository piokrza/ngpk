import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirestoreDbSubscriptionService {
  private readonly unsubscribe$$ = new Subject<void>();

  get unsubscribe$(): Observable<void> {
    return this.unsubscribe$$.asObservable();
  }

  unsubscribe(): void {
    this.unsubscribe$$.next();
  }
}
