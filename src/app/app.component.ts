import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { isLightMode } from '@common/constants/is-light-mode';
import { PersistanceService } from '@common/services/persistance.service';
import { ThemeService } from '@common/services/theme.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '@store/auth';
import { CashFlowActions } from '@store/cash-flow';
import { CategoriesActions } from '@store/categories';
import firebase from 'firebase/compat';
import { PrimeNGConfig } from 'primeng/api';
import { tap } from 'rxjs';

@Component({
  selector: 'ctrl-root',
  template: `
    <main class="h-[calc(100vh-82px)] xl:h-screen">
      <router-outlet></router-outlet>
    </main>

    <p-toast position="top-right" />
    <p-confirmDialog />
  `,
})
export class AppComponent implements OnInit {
  private store: Store = inject(Store);
  private primengConfig: PrimeNGConfig = inject(PrimeNGConfig);
  private themeService: ThemeService = inject(ThemeService);
  private authState: AuthService = inject(AuthService);

  private isLightMode: boolean | null = inject(PersistanceService).get<boolean>(isLightMode);

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.themeService.setTheme(this.isLightMode);

    this.authState.authState$
      .pipe(
        tap((user: firebase.User | null): void => {
          user && this.dispatchStoreActions(user.uid);
        })
      )
      .subscribe();
  }

  private dispatchStoreActions(uid: string): void {
    this.store.dispatch(CategoriesActions.getCategories());
    this.store.dispatch(AuthActions.loadUserData());
    this.store.dispatch(CashFlowActions.getCashFlowUserData({ uid }));
  }
}
