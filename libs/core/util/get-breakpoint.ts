import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const breakpoints = [
  { name: 'sm', value: '576px' },
  { name: 'md', value: '768px' },
  { name: 'lg', value: '992px' },
  { name: 'xl', value: '1200px' },
  { name: 'xxl', value: '1500px' },
] as const;

type BreakpointName = (typeof breakpoints)[number]['name'];

export const getBreakpoint = (breakpointName: BreakpointName): Signal<boolean> => {
  const breakpointValue = breakpoints.find(({ name }) => name === breakpointName)?.value ?? '';
  const isBreakpointMatching = inject(BreakpointObserver)
    .observe([`(min-width: ${breakpointValue})`])
    .pipe(map(({ matches }: BreakpointState) => !matches));

  return toSignal(isBreakpointMatching, { initialValue: false });
};
