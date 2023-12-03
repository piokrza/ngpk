import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DriveState {
  private readonly isLoading$$ = new BehaviorSubject<boolean>(false);
  private readonly progress$$ = new BehaviorSubject<number>(0);

  public setProgress(progress: number): void {
    this.progress$$.next(progress);
  }

  public get progress$(): Observable<number> {
    return this.progress$$.asObservable();
  }

  public setIsLoading(isLoading: boolean): void {
    this.isLoading$$.next(isLoading);
  }

  public get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }
}
