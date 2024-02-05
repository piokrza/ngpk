import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { ToastStatus } from '#core/enums';
import { ToastService } from '#core/services';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<never> => {
      let errorMsg = '';

      if (error.error instanceof ErrorEvent) {
        errorMsg = `Client Error: ${error.error.message}`;
      } else {
        errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
      }

      toastService.showMessage(ToastStatus.ERROR, 'Error', error.message);

      return throwError(() => errorMsg);
    })
  );
};
