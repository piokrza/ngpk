import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<never> => {
      let errorMsg = '';

      if (error.error instanceof ErrorEvent) {
        errorMsg = `Client Error: ${error.error.message}`;
      } else {
        errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
      }

      return throwError(() => errorMsg);
    })
  );
};
