import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

import { AuthService } from '@ngpk/email/service';
import { AuthStateService } from '@ngpk/email/state/auth';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const authStateService = inject(AuthStateService);

  return authService.checkAuth$().pipe(
    switchMap(() => authStateService.select('isSignedIn').pipe(map((isSignedIn) => Boolean(isSignedIn)))),
    tap((isSignedIn: boolean) => !isSignedIn && void router.navigate(['']))
  );
};
