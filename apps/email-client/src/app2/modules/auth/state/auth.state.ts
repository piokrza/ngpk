import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private signedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private username$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private authLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setSignedIn(signedIn: boolean): void {
    this.signedIn$.next(signedIn);
  }

  getSignedIn$(): Observable<boolean> {
    return this.signedIn$.asObservable();
  }

  setUsername(username: string): void {
    this.username$.next(username);
  }

  getUsername$(): Observable<string> {
    return this.username$.asObservable();
  }

  setAuthLoading(isLoading: boolean): void {
    this.authLoading$.next(isLoading);
  }

  getAuthLoading$(): Observable<boolean> {
    return this.authLoading$.asObservable();
  }
}
