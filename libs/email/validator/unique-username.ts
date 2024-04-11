import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { map, Observable, catchError, of } from 'rxjs';

import { AuthService } from '@ngpk/email/service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  readonly #authService = inject(AuthService);

  validate = (control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.#authService.usernameAvailable$(control.value).pipe(
      map(() => null), // if username is available map response to null
      catchError(({ error }: HttpErrorResponse): Observable<ValidationErrors> => {
        if (error.username) {
          return of({ nonUniqueUsername: true });
        }

        return of({ noConnection: true });
      })
    );
  };
}
