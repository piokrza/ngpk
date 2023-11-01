import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map, tap } from 'rxjs';

import { AppPaths } from '#common/enums';
import { User } from '#common/models';
import { AuthSelectors } from '#store/auth';

export const isLoggedInGuard: CanMatchFn = (): Observable<boolean> => {
  const router: Router = inject(Router);

  return inject(Store)
    .select(AuthSelectors.user)
    .pipe(
      filter(Boolean),
      map((user: User): boolean => Boolean(user)),
      tap((isUser) => isUser && router.navigateByUrl(AppPaths.DASHBOARD))
    );
};
