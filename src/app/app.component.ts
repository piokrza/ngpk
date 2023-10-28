import { Component, inject, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import firebase from 'firebase/compat';
import { PrimeNGConfig } from 'primeng/api';
import { tap } from 'rxjs';

import { AuthService } from '#pages/auth/services';
import { AuthActions } from '#store/auth';
import { CashFlowActions } from '#store/cash-flow';
import { CategoriesActions } from '#store/categories';

@UntilDestroy()
@Component({
  selector: 'ctrl-root',
  template: `<router-outlet />`,
})
export class AppComponent implements OnInit {
  private readonly store: Store = inject(Store);
  private readonly authService: AuthService = inject(AuthService);
  private readonly primengConfig: PrimeNGConfig = inject(PrimeNGConfig);
  private readonly translateService: TranslateService = inject(TranslateService);

  public ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));

    this.authService.authState$
      .pipe(
        tap((user: firebase.User | null) => user && this.dispatchStoreActions(user.uid)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private dispatchStoreActions(uid: string): void {
    this.store.dispatch(CategoriesActions.getCategories());
    this.store.dispatch(AuthActions.loadUserData());
    this.store.dispatch(CashFlowActions.getCashFlowUserData({ uid }));
  }
}
