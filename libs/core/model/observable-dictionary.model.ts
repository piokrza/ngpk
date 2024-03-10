import { Observable } from 'rxjs';

export type ObservableDictionary<T> = {
  [K in keyof T]: Observable<T[K]>;
};
