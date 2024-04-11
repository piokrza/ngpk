import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanMatchFn, Router } from '@angular/router';
import { delay, map, skipWhile, tap } from 'rxjs';

import { AuthStateService } from '@ngpk/email/state/auth';

export const authGuard: CanMatchFn = () => {
  const router: Router = inject(Router);
  const authStateService: AuthStateService = inject(AuthStateService);

  // return toObservable(authStateService.state).pipe(
  //   delay(100),
  //   map(({ isSignedIn }) => isSignedIn),
  //   skipWhile((signedIn) => signedIn === null),
  //   map((signedIn) => Boolean(signedIn)),
  //   tap((authenticated: boolean) => !authenticated && router.navigateByUrl('/'))
  // );

  return true;
};
