import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/compat';
import { catchError, EMPTY, exhaustMap, from, map, of, takeUntil, tap } from 'rxjs';

import { ToastStatus } from '@ngpk/core/enum';
import { FirestoreDbSubscriptionService, ToastService } from '@ngpk/core/service';
import { AuthApiService, UserService } from '@ngpk/organizer/api';
import { AuthActions } from '@ngpk/organizer/state/auth';
import { ActionTypes } from '@ngpk/organizer/state/auth/action-types';

@Injectable()
export class AuthEffects {
  private readonly router = inject(Router);
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly toastService = inject(ToastService);
  private readonly authApiService = inject(AuthApiService);
  private readonly translateService = inject(TranslateService);
  private readonly firestoreDbSubscriptionService = inject(FirestoreDbSubscriptionService);

  signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      exhaustMap(() => {
        return from(this.authApiService.signinWithGoogle()).pipe(
          map(({ user }) => AuthActions.signInWithGoogleSuccess({ user: this.userService.getIUserModel(user as firebase.User) })),
          tap(() => {
            this.router.navigateByUrl('');
            this.toastService.showMessage('success', this.tr('success'), this.tr('loginSuccess'));
          }),
          catchError(() => of(AuthActions.userNotAuthenticated()))
        );
      })
    );
  });

  signInWithGoogleSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInWithGoogleSuccess),
        exhaustMap(({ user }) => (user ? this.userService.addUserToDatabase$(user) : EMPTY))
      );
    },
    { dispatch: false }
  );

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap((): Promise<void> => this.authApiService.signOut()),
      map(() => AuthActions.userNotAuthenticated()),
      tap(() => this.firestoreDbSubscriptionService.unsubscribe()),
      tap(() => {
        this.router.navigateByUrl('');
        this.toastService.showMessage('success', this.tr('success'), this.tr('logoutSuccess'));
      })
    );
  });

  signInWithEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithEmailAndPassword),
      exhaustMap(({ payload }) => {
        return from(this.authApiService.signInWithEmailAndPassword(payload)).pipe(
          map(() => AuthActions.signInWithEmailAndPasswordSuccess()),
          tap(() => {
            this.router.navigateByUrl('');
            this.toastService.showMessage('success', this.tr('success'), this.tr('loginSuccess'));
          }),
          catchError(({ message }: HttpErrorResponse) => {
            return of(AuthActions.signInWithEmailAndPasswordFailure({ errorMessage: message }));
          })
        );
      })
    );
  });

  signUpWithEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.SIGN_UP_WITH_EMAIL_AND_PASSWORD),
      exhaustMap(({ payload }) => {
        return from(this.authApiService.signUpWithEmailAndPassword(payload)).pipe(
          map(({ user }) => {
            return AuthActions.signUpWithEmailAndPasswordSuccess({ user: this.userService.getIUserModel(user as firebase.User) });
          }),
          tap(() => {
            this.router.navigateByUrl('');
            this.toastService.showMessage('success', this.tr('success'), this.tr('loginSuccess'));
          }),
          catchError(({ message }: HttpErrorResponse) => {
            return of(AuthActions.signUpWithEmailAndPasswordFailure({ errorMessage: message }));
          })
        );
      })
    );
  });

  signUpWithEmailAndPasswordSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signUpWithEmailAndPasswordSuccess),
        exhaustMap(({ user }) => (user ? this.userService.addUserToDatabase$(user) : EMPTY))
      );
    },
    { dispatch: false }
  );

  loadUserData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadUserData),
      exhaustMap(({ uid }) =>
        this.authApiService.loadUserData$(uid).pipe(
          map((user) => AuthActions.loadUserDataSuccess({ user })),
          takeUntil(this.firestoreDbSubscriptionService.unsubscribe$)
        )
      )
    );
  });

  updateAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.updateAccount),
      exhaustMap(({ updatedUserData }) => {
        return from(this.userService.updateUser$(updatedUserData)).pipe(
          map(() => AuthActions.updateAccountSuccess()),
          tap(() => this.toastService.showMessage(ToastStatus.SUCCESS, this.tr('success'), this.tr('accUpdateSuccess'))),
          tap(() => this.router.navigateByUrl('')),
          catchError(() => of(AuthActions.updateAccountFailure()))
        );
      })
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
