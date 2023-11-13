import { TrackByFunction } from '@angular/core';

export function trackByKey<T extends object>(key: keyof T): TrackByFunction<T> {
  return (idx: number, item: T) => (item ? item[key] : key);
}

export const TrackByIdx: TrackByFunction<unknown> = (index: number) => index;
//TODO: replace with new control flow
