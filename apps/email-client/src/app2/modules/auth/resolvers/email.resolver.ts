import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { InboxApi } from '@inbox/api';
import { Email } from '@inbox/models';
import { Observable, catchError, EMPTY } from 'rxjs';

@Injectable()
export class EmailResolver implements Resolve<Email> {
  constructor(private inboxApi: InboxApi, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Email> {
    const { id } = route.params;

    return this.inboxApi.loadEmailById$(id).pipe(
      catchError((): Observable<never> => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }
}
