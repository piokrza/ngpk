import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, EMPTY, exhaustMap, from, map, of, takeUntil, tap } from 'rxjs';

import { AuthApiService, UserService } from '#auth/services';
import { AppPaths, ToastStatus } from '#common/enums';
import { DbSubscriptionService, ToastService } from '#common/services';
import { AuthActions } from '#store/auth';
import { ActionTypes } from '#store/auth/action-types';

@Injectable()
export class AuthEffects {
  private readonly router: Router = inject(Router);
  private readonly actions$: Actions = inject(Actions);
  private readonly userService: UserService = inject(UserService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly authApiService: AuthApiService = inject(AuthApiService);
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly dbSubscriptionService: DbSubscriptionService = inject(DbSubscriptionService);

  public signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      exhaustMap(() => {
        return from(this.authApiService.signinWithGoogle()).pipe(
          tap(() => void this.router.navigateByUrl(AppPaths.DASHBOARD)),
          map(({ user }) => AuthActions.signInWithGoogleSuccess({ user: this.userService.getIUserModel(user!) })),
          catchError(() => of(AuthActions.userNotAuthenticated()))
        );
      })
    );
  });

  public signInWithGoogleSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInWithGoogleSuccess),
        exhaustMap(({ user }) => (user ? this.userService.addUserToDatabase$(user) : EMPTY))
      );
    },
    { dispatch: false }
  );

  public signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap((): Promise<void> => this.authApiService.signOut()),
      map(() => AuthActions.userNotAuthenticated()),
      tap(() => void this.router.navigateByUrl(`/${AppPaths.AUTHENTICATION}`))
    );
  });

  public signInWithEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithEmailAndPassword),
      exhaustMap(({ payload }) => {
        return from(this.authApiService.signInWithEmailAndPassword(payload)).pipe(
          tap(() => void this.router.navigateByUrl(`/${AppPaths.DASHBOARD}`)),
          map(({ user }) => AuthActions.signInWithEmailAndPasswordSuccess({ user: this.userService.getIUserModel(user!) })),
          catchError(({ message }: HttpErrorResponse) => {
            return of(AuthActions.signInWithEmailAndPasswordFailure({ errorMessage: message }));
          })
        );
      })
    );
  });

  public signInWithEmailAndPasswordSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInWithEmailAndPasswordSuccess),
        exhaustMap(({ user }) => (user ? this.userService.addUserToDatabase$(user) : EMPTY))
      );
    },
    { dispatch: false }
  );

  public signUpWithEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD),
      exhaustMap(({ payload }) => {
        return from(this.authApiService.signUpWithEmailAndPassword(payload)).pipe(
          map(() => AuthActions.signUpWithEmailAndPasswordSuccess()),
          tap(() => void this.router.navigateByUrl(`/${AppPaths.DASHBOARD}`)),
          catchError(({ message }: HttpErrorResponse) => {
            return of(AuthActions.signUpWithEmailAndPasswordFailure({ errorMessage: message }));
          })
        );
      })
    );
  });

  public loadUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserData),
      exhaustMap(({ uid }) =>
        this.authApiService.loadUserData$(uid).pipe(
          map((user) => AuthActions.loadUserDataSuccess({ user })),
          takeUntil(this.dbSubscriptionService.unsubscribe$)
        )
      )
    );
  });

  public updateAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.updateAccount),
      exhaustMap(({ updatedUserData }) => {
        return from(this.userService.updateUser$(updatedUserData)).pipe(
          map(() => AuthActions.updateAccountSuccess()),
          tap(() => this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('accUpdateSuccess'))),
          catchError(() => of(AuthActions.updateAccountFailure()))
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
