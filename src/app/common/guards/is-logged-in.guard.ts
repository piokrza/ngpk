import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';

import { AppPaths } from '#common/enums';
import { AuthSelectors } from '#store/auth';

export const isLoggedInGuard: CanMatchFn = (): Observable<boolean> => {
  const router: Router = inject(Router);

  return inject(Store)
    .select(AuthSelectors.user)
    .pipe(
      map(({ email }): boolean => Boolean(email?.length)),
      tap((isEmail: boolean) => isEmail && router.navigateByUrl(AppPaths.DASHBOARD))
    );
};
