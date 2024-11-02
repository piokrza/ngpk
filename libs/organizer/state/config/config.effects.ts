import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil } from 'rxjs';

import { ToastService } from '@ngpk/core/service';
import { ConfigApiService } from '@ngpk/organizer/api';
import { FirestoreDbSubscriptionService } from '@ngpk/organizer/service/shared';
import { ConfigActions } from '@ngpk/organizer/state/config';

@Injectable()
export class ConfigEffects {
  readonly #actions$ = inject(Actions);
  readonly #toastService = inject(ToastService);
  readonly #configApiService = inject(ConfigApiService);
  readonly #translateService = inject(TranslateService);
  readonly #firestoreDbSubscriptionService = inject(FirestoreDbSubscriptionService);

  readonly #tr = (path: string) => this.#translateService.instant('toastMessage.' + path);

  loadConfig$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(ConfigActions.loadConfig),
      exhaustMap(({ uid }) => {
        return this.#configApiService.loadConfig$(uid).pipe(
          map((config) => ConfigActions.loadConfigSuccess({ config })),
          takeUntil(this.#firestoreDbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.#toastService.showMessage('error', this.#tr('success'), this.#tr('loadDataError'));
            return of(ConfigActions.loadConfigFailure());
          })
        );
      })
    );
  });

  updateConfig$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(ConfigActions.updateConfig),
      exhaustMap(({ config }) => {
        return from(this.#configApiService.updateConfig(config)).pipe(
          map(() => ConfigActions.updateConfigSuccess()),
          takeUntil(this.#firestoreDbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.#toastService.showMessage('error', this.#tr('success'), this.#tr('loadDataError'));
            return of(ConfigActions.updateConfigFailure());
          })
        );
      })
    );
  });
}
