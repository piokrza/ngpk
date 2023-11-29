import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/compat';
import { catchError, exhaustMap, from, map, of, switchMap, take, tap } from 'rxjs';

import { User } from '#auth/models';
import { AuthApi } from '#auth/services';
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
  private readonly translateService = inject(TranslateService);
  private readonly authApi: AuthApi = inject(AuthApi);
  private readonly toastService: ToastService = inject(ToastService);

  public signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      exhaustMap(() => {
        return from(this.authApi.signinWithGoogle()).pipe(
          map(({ user }: firebase.auth.UserCredential) => AuthActions.userAuthenticated({ user: setUser(user!) })),
          tap(() => this.router.navigateByUrl(AppPaths.DASHBOARD)),
          catchError(() => of(AuthActions.userNotAuthenticated()))
        );
      })
    );
  });

  public signInWithGoogleSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.userAuthenticated),
        exhaustMap(({ user }) => this.authApi.addUserToDatabase$(user))
      );
    },
    { dispatch: false }
  );

  public signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap((): Promise<void> => this.authApi.signOut()),
      map(() => AuthActions.userNotAuthenticated()),
      tap(() => this.router.navigateByUrl('/authentication'))
    );
  });

  public signInWithEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithEmailAndPassword),
      exhaustMap(({ payload }) => {
        return from(this.authApi.signInWithEmailAndPassword(payload)).pipe(
          map(() => AuthActions.signInWithEmailAndPasswordSuccess()),
          tap(() => this.router.navigateByUrl(`/${AppPaths.DASHBOARD}`)),
          catchError(({ message }: HttpErrorResponse) => of(AuthActions.signInWithEmailAndPasswordFailure({ errorMessage: message })))
        );
      })
    );
  });

  public signUpWithEmailAndPassword$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD),
        exhaustMap(({ payload }) => {
          return from(this.authApi.signUpWithEmailAndPassword(payload)).pipe(
            map(({ user }) => {
              return this.authApi.addUserToDatabase$(setUser(user!)).pipe(map(() => AuthActions.signUpWithEmailAndPasswordSuccess()));
            }),
            tap(() => this.router.navigateByUrl(`/${AppPaths.DASHBOARD}`)),
            catchError(({ message }: HttpErrorResponse) => of(AuthActions.signUpWithEmailAndPasswordFailure({ errorMessage: message })))
          );
        })
      );
    },
    { dispatch: false }
  );

  public loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserData),
      exhaustMap(() => this.authApi.authState$),
      switchMap((user: firebase.User | null) => {
        return this.authApi.loadUserData$(user).pipe(
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
        return from(this.authApi.updateUser$(updatedUserData)).pipe(
          map(() => AuthActions.updateAccountSuccess()),
          tap(() => this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), 'Account data successfully updated')),
          catchError(() => of(AuthActions.updateAccountFailure()))
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
