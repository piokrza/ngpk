import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ResolveFn } from '@angular/router';
import { Observable, catchError, EMPTY } from 'rxjs';

import { InboxHttpService } from '@ngpk/email/api';
import { Email } from '@ngpk/email/model';

export const emailResolver: ResolveFn<Email> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const inboxApi = inject(InboxHttpService);
  const { id } = route.params;

  return inboxApi.loadEmailById$(id).pipe(
    catchError((): Observable<never> => {
      router.navigateByUrl('/inbox/not-found');
      return EMPTY;
    })
  );
};
