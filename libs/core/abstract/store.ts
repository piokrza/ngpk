import { BehaviorSubject, Observable, map } from 'rxjs';

export abstract class Store<T> {
  constructor(private readonly initialState: T) {}

  private readonly state$$ = new BehaviorSubject<T>(this.initialState);

  get state$(): Observable<T> {
    return this.state$$.asObservable();
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return this.state$.pipe(map((state) => state[key]));
  }

  update<K extends keyof T>(key: K, value: T[K]): void {
    const updatedState = { ...this.state$$.value, [key]: value };
    this.state$$.next(updatedState);
  }

  clear(): void {
    this.state$$.next(this.initialState);
  }
}
