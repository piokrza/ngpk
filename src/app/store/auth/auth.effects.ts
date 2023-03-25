import { inject, Injectable } from '@angular/core';
import { ToastService } from '@common/services/toast.service';
import { AuthService } from '@auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, from, map, of, tap } from 'rxjs';
import { AuthActions } from '@store/auth';
import { Router } from '@angular/router';
import { ToastStatus } from '@common/enums/toast-status.enum';
import firebase from 'firebase/compat';
import { setUser } from '@common/utils/set-user';
import { ActionTypes } from './action-types';

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
              return AuthActions.signInWithGoogleSuccess({ user: setUser(user) });
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
          this.toastService.showMessage(ToastStatus.INFO, 'Success!', 'You were successfully logged out');
        })
      );
    },
    { dispatch: false }
  );

  public signInWithEmailAndPassword$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInWithEmailAndPassword),
        exhaustMap(({ payload }) => {
          return from(this.authService.signInWithEmailAndPassword(payload)).pipe(
            tap(() => {
              this.router.navigateByUrl('/dashboard');
            }),

            catchError(() => {
              //TODO: Set form errors

              this.toastService.showMessage(
                ToastStatus.ERROR,
                'Error!',
                'Something went wrong during google authorization'
              );

              return EMPTY;
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  public signUpWithEmailAndPassword$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD),
        exhaustMap(({ payload }) => {
          return from(this.authService.signUpWithEmailAndPassword(payload)).pipe(
            tap(() => {
              this.router.navigateByUrl('/dashboard');
            }),

            catchError(() => {
              this.toastService.showMessage(
                ToastStatus.ERROR,
                'Error!',
                'Something went wrong during google authorization'
              );
              return EMPTY;
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}
