import { inject, Injectable } from '@angular/core';
import { User } from '@common/models/user.model';
import { ToastService } from '@common/services/toast.service';
import { AuthService } from '@auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, from, map, of, tap } from 'rxjs';
import { AuthActions } from '@store/auth';
import { Router } from '@angular/router';
import { ToastStatus } from '@common/enums/toast-status.enum';
import firebase from 'firebase/compat';

@Injectable()
export class AuthEffects {
  private actions$: Actions = inject(Actions);
  private toastService: ToastService = inject(ToastService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      exhaustMap(() => {
        return from(this.authService.signinWithGoogle()).pipe(
          map(({ user }: firebase.auth.UserCredential) => {
            if (user !== null) {
              return AuthActions.signInWithGoogleSuccess({
                user: {
                  displayName: user.displayName,
                  email: user.email,
                  emailVerified: user.emailVerified,
                  phoneNumber: user.phoneNumber,
                  photoURL: user.photoURL,
                  refreshToken: user.refreshToken,
                  uid: user.uid,
                } as User,
              });
            }

            console.error('Provided account does not exist');
            return AuthActions.signInWithGoogleFailure();
          }),
          tap((): void => {
            this.router.navigateByUrl('/dashboard');
          }),

          catchError((e) => {
            this.toastService.showMessage(
              ToastStatus.ERROR,
              'Error!',
              'Something went wrong during google authorisation'
            );

            return of(AuthActions.signInWithGoogleFailure());
          })
        );
      })
    );
  });

  public signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signOut),
        exhaustMap((): Promise<void> => {
          return this.authService.signOut();
        }),
        tap((): void => {
          this.router.navigateByUrl('/authentication');
        })
      );
    },
    { dispatch: false }
  );
}
