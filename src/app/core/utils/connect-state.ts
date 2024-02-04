import type { DestroyRef } from '@angular/core';
import { ChangeDetectorRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { from, mergeMap, tap } from 'rxjs';

import { ObservableDictionary } from '#core/models';

export type StateObject<T = unknown> = Readonly<T> & object;

export function connectState<T>(destroyRef: DestroyRef, sourcesObject: ObservableDictionary<T>) {
  const cdRef = inject(ChangeDetectorRef);

  const stateObject = {} as StateObject<T>;

  from(Object.keys(sourcesObject) as Array<keyof T>)
    .pipe(
      mergeMap((sourceKey: keyof T) => {
        const sourceValue$ = sourcesObject[sourceKey];

        return sourceValue$.pipe(
          tap((sourceValue: T[keyof T]) => {
            stateObject[sourceKey] = sourceValue as StateObject<T>[keyof T];
          })
        );
      }),
      takeUntilDestroyed(destroyRef)
    )

    .subscribe(() => cdRef.markForCheck());

  return stateObject;
}
