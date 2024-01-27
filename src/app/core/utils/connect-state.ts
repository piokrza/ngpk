import type { DestroyRef } from '@angular/core';
import { ChangeDetectorRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { Observable, Subject } from 'rxjs';
import { ReplaySubject, from, mergeMap, tap } from 'rxjs';

type ObservableDictionary<T> = {
  [P in keyof T]: Observable<T[P]>;
};

type SubjectDictionary<T> = {
  [P in keyof T]: Subject<T[P]>;
};

type LoadingDictionary<T> = {
  [P in keyof T]: boolean;
};

type RestrictedKeys<T> = ObservableDictionary<T> & { loading?: never; $?: never };

export type StateObject<T = unknown> = Readonly<T> & {
  $: SubjectDictionary<T>;
  loading: LoadingDictionary<T>;
};

export function connectState<T>(destroyRef: DestroyRef, sources: RestrictedKeys<T>) {
  const cdRef = inject(ChangeDetectorRef);

  const sink = {
    $: {},
    loading: {},
  } as StateObject<T>;

  const sourceKeys = Object.keys(sources) as Array<keyof T>;

  for (const key of sourceKeys) {
    sink.$[key] = new ReplaySubject<T[keyof T]>(1);
    sink.loading[key] = true;
  }

  from(sourceKeys)
    .pipe(
      mergeMap((sourceKey: keyof T) => {
        const source$ = (sources as ObservableDictionary<T>)[sourceKey];

        if (!source$?.pipe) {
          throw new Error(`connectState: source of "state.${String(sourceKey)}" is not an Observable.`);
        }

        return source$.pipe(
          tap((sinkValue: T[keyof T]) => {
            sink.loading[sourceKey] = false;
            sink.$[sourceKey].next(sinkValue);
            sink[sourceKey] = sinkValue as StateObject<T>[keyof T];
          })
        );
      })
    )
    .pipe(takeUntilDestroyed(destroyRef))
    .subscribe({ next: () => cdRef.markForCheck() });

  return sink;
}
