import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat';
import { PrimeNGConfig } from 'primeng/api';
import { tap } from 'rxjs';

import { isLightMode } from '#common/constants';
import { PersistanceService, ThemeService } from '#common/services';
import { AuthService } from '#pages/auth/services';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';
import { CategoriesActions } from '#store/categories';

@Component({
  selector: 'ctrl-root',
  template: `
    <ctrl-layout>
      <router-outlet></router-outlet>
    </ctrl-layout>
  `,
})
export class AppComponent implements OnInit {
  private store: Store = inject(Store);
  private authState: AuthService = inject(AuthService);
  private themeService: ThemeService = inject(ThemeService);
  private primengConfig: PrimeNGConfig = inject(PrimeNGConfig);

  private isLightMode: boolean | null = inject(PersistanceService).get<boolean>(isLightMode);

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.themeService.setTheme(this.isLightMode);

    this.authState.authState$
      .pipe(tap((user: firebase.User | null) => user && this.dispatchStoreActions(user.uid)))
      .subscribe();
  }

  private dispatchStoreActions(uid: string): void {
    this.store.dispatch(CategoriesActions.getCategories());
    this.store.dispatch(AuthActions.loadUserData());
    this.store.dispatch(CashFlowActions.getCashFlowUserData({ uid }));
  }
}
