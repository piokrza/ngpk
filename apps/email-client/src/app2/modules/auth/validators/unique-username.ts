import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { map, Observable, catchError, of } from 'rxjs';
import { AuthService } from '@auth/services';
import { AvailableUsernameResponse } from '@auth/models';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (
    control: FormControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.authService.usernameAvailable$(control.value).pipe(
      // if username is available map response to null
      map(() => null),
      catchError(({ error }: HttpErrorResponse): Observable<ValidationErrors> => {
        if (error.username) {
          return of({ nonUniqueUsername: true });
        }

        return of({ noConnection: true });
      })
    );
  };
}
