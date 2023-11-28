import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import firebase from 'firebase/compat';
import { catchError, exhaustMap, from, iif, map, of, switchMap, take, tap } from 'rxjs';

import { User } from '#auth/models';
import { AuthService } from '#auth/services';
import { AppPaths, ToastStatus } from '#common/enums';
import { ToastService } from '#common/services';
import { setUser } from '#common/utils/set-user';
import { AuthActions } from '#store/auth';
import { ActionTypes } from '#store/auth/action-types';
import { CashFlowActions } from '#store/cash-flow';

@Injectable()
export class AuthEffects {
  private readonly router: Router = inject(Router);
  private readonly actions$: Actions = inject(Actions);
  private readonly authService: AuthService = inject(AuthService);
  private readonly toastService: ToastService = inject(ToastService);

  public signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      exhaustMap(() => {
        return from(this.authService.signinWithGoogle()).pipe(
          switchMap(({ user }: firebase.auth.UserCredential) => {
            return iif(
              () => user !== null,
              this.authService.addUserToDatabase$(setUser(user!)).pipe(
                map(() => AuthActions.userAuthenticated({ user: setUser(user!) })),
                catchError(() => of(AuthActions.userNotAuthenticated()))
              ),
              of(AuthActions.userNotAuthenticated())
            );
          }),
          tap((): void => {
            this.router.navigateByUrl('/dashboard');
          })
        );
      })
    );
  });

  public signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap((): Promise<void> => this.authService.signOut()),
      map(() => AuthActions.userNotAuthenticated()),
      tap((): void => {
        this.router.navigateByUrl('/authentication');
        this.toastService.showMessage(ToastStatus.INFO, 'Success!', 'You were successfully logged out');
      })
    );
  });

  public signInWithEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithEmailAndPassword),
      exhaustMap(({ payload }) => {
        return from(this.authService.signInWithEmailAndPassword(payload)).pipe(
          map(() => {
            return AuthActions.signInWithEmailAndPasswordSuccess();
          }),
          tap((): void => {
            this.router.navigateByUrl(`/${AppPaths.DASHBOARD}`);
          }),

          catchError(({ message }: HttpErrorResponse) => {
            return of(AuthActions.signInWithEmailAndPasswordFailure({ errorMessage: message }));
          })
        );
      })
    );
  });

  public signUpWithEmailAndPassword$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD),
        exhaustMap(({ payload }) => {
          return from(this.authService.signUpWithEmailAndPassword(payload)).pipe(
            switchMap(({ user }) => {
              if (user) {
                return this.authService.addUserToDatabase$(setUser(user)).pipe(
                  take(1),
                  map(() => AuthActions.signUpWithEmailAndPasswordSuccess())
                );
              } else return of(AuthActions.signUpWithEmailAndPasswordSuccess());
            }),
            tap(() => {
              this.router.navigateByUrl(`/${AppPaths.DASHBOARD}`);
            }),
            catchError(({ message }: HttpErrorResponse) => {
              return of(AuthActions.signUpWithEmailAndPasswordFailure({ errorMessage: message }));
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  public loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserData),
      exhaustMap(() => this.authService.authState$),
      switchMap((user: firebase.User | null) => {
        return this.authService.loadUserData$(user).pipe(
          map((user: User | undefined) => {
            if (user) return AuthActions.userAuthenticated({ user });
            return AuthActions.userNotAuthenticated();
          })
        );
      })
    );
  });

  public loadUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userAuthenticated),
      switchMap(({ user }) => {
        if (!user) return of(AuthActions.userNotAuthenticated());
        return of(CashFlowActions.getCashFlowUserData({ uid: user.uid })).pipe(take(1));
      })
    );
  });

  public updateAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.updateAccount),
      exhaustMap(({ updatedUserData }) => {
        return from(this.authService.updateUser$(updatedUserData)).pipe(
          map(() => AuthActions.updateAccountSuccess()),
          tap(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Account data successfully updated');
          }),
          catchError(() => {
            return of(AuthActions.updateAccountFailure());
          })
        );
      })
    );
  });
}
