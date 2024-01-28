import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, exhaustMap, from, map, of, takeUntil } from 'rxjs';

import { ConfigApiService } from '#core/config/services';
import { ConfigActions } from '#core/config/store';
import { ToastService, DbSubscriptionService } from '#core/services';

@Injectable()
export class ConfigEffects {
  private readonly actions$ = inject(Actions);
  private readonly toastService = inject(ToastService);
  private readonly configApiService = inject(ConfigApiService);
  private readonly translateService = inject(TranslateService);
  private readonly dbSubscriptionService = inject(DbSubscriptionService);

  loadConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.loadConfig),
      exhaustMap(({ uid }) =>
        this.configApiService.loadConfig$(uid).pipe(
          map((config) => ConfigActions.loadConfigSuccess({ config })),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage('error', this.tr('success'), this.tr('loadDataError'));
            return of(ConfigActions.loadConfigFailure());
          })
        )
      )
    );
  });

  updateConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConfigActions.updateConfig),
      exhaustMap(({ config }) =>
        from(this.configApiService.updateConfig(config)).pipe(
          map(() => ConfigActions.updateConfigSuccess()),
          takeUntil(this.dbSubscriptionService.unsubscribe$),
          catchError(() => {
            this.toastService.showMessage('error', this.tr('success'), this.tr('loadDataError'));
            return of(ConfigActions.updateConfigFailure());
          })
        )
      )
    );
  });

  private tr(path: string): string {
    return this.translateService.instant('toastMessage.' + path);
  }
}
