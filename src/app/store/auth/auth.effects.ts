import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import firebase from 'firebase/compat';
import { catchError, exhaustMap, from, map, of, switchMap, take, tap } from 'rxjs';

import { CashFlowApi } from '#common/api';
import { ToastStatus } from '#common/enums';
import { User } from '#common/models';
import { ToastService } from '#common/services';
import { setUser } from '#common/utils/set-user';
import { AuthFormPayload } from '#pages/auth/models';
import { AuthService } from '#pages/auth/services';
import { AuthActions } from '#store/auth';
import { ActionTypes } from '#store/auth/action-types';
import { CashFlowActions } from '#store/cash-flow';

@Injectable()
export class AuthEffects {
  private readonly router: Router = inject(Router);
  private readonly actions$: Actions = inject(Actions);
  private readonly cashFlowApi: CashFlowApi = inject(CashFlowApi);
  private readonly authService: AuthService = inject(AuthService);
  private readonly toastService: ToastService = inject(ToastService);

  public signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      exhaustMap(() => {
        return from(this.authService.signinWithGoogle()).pipe(
          map(({ user }: firebase.auth.UserCredential) => {
            if (user !== null) {
              this.cashFlowApi.addUserToDatabase$(setUser(user)).subscribe();
              return AuthActions.userAuthenticated({ user: setUser(user) });
            }

            return AuthActions.userNotAuthenticated();
          }),
          tap((): void => {
            this.router.navigateByUrl('/dashboard');
          }),

          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during google authorisation');

            return of(AuthActions.userNotAuthenticated());
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
        return from(this.authService.signInWithEmailAndPassword(payload as AuthFormPayload)).pipe(
          map(() => {
            return AuthActions.signInWithEmailAndPasswordSuccess();
          }),
          tap((): void => {
            this.router.navigateByUrl('/dashboard');
          }),

          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during google authorization');

            return of(AuthActions.signInWithEmailAndPasswordFailure());
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
            map(({ user }) => {
              user && this.cashFlowApi.addUserToDatabase$(setUser(user)).pipe(take(1)).subscribe();
              return AuthActions.signUpWithEmailAndPasswordSuccess();
            }),
            tap(() => this.router.navigateByUrl('/dashboard')),
            catchError(() => {
              this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during authorization');
              return of(AuthActions.signUpWithEmailAndPasswordFailure());
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
        return from(this.cashFlowApi.updateUser$(updatedUserData)).pipe(
          map(() => AuthActions.updateAccountSuccess()),
          tap(() => {
            this.toastService.showMessage(ToastStatus.SUCCESS, 'Success!', 'Account data successfully updated');
          }),
          catchError(() => {
            this.toastService.showMessage(ToastStatus.ERROR, 'Error!', 'Something went wrong during updated account data');

            return of(AuthActions.updateAccountFailure());
          })
        );
      })
    );
  });
}
