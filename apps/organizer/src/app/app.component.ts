import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { filter, Observable, tap } from 'rxjs';

import { PrimeNGConfig } from 'primeng/api';

import { AuthApiService } from '#auth/services';

import { AuthActions } from '#auth/store';
import { CashFlowActions } from '#cash-flow/store';

import firebase from 'firebase/compat';

import { ConfigActions } from '#core/config/store';

import { ThemeService } from '#core/services';

import { DriveActions } from '#drive/store';

import { TaskerActions } from '#tasker/store';

@Component({
  selector: 'org-root',
  template: `
    <org-layout>
      <router-outlet />
    </org-layout>
  `,
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly themeService = inject(ThemeService);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly translateService = inject(TranslateService);
  private readonly authApiService = inject(AuthApiService);

  ngOnInit(): void {
    this.setPrimeNgConfig();
    this.loadUserData$().subscribe();
    this.themeService.applyTheme$().subscribe();
  }

  private loadUserData$(): Observable<firebase.User> {
    return this.authApiService.authState$.pipe(
      filter(Boolean),
      tap(({ uid }) => {
        this.store.dispatch(DriveActions.loadFiles({ uid }));
        this.store.dispatch(AuthActions.loadUserData({ uid }));
        this.store.dispatch(ConfigActions.loadConfig({ uid }));
        this.store.dispatch(TaskerActions.loadBoards({ uid }));
        this.store.dispatch(CashFlowActions.loadCashFlow({ uid }));
      })
    );
  }

  private setPrimeNgConfig(): void {
    this.primengConfig.ripple = true;
    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  }
}
