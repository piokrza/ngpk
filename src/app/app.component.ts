import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CashFlowActions } from '@store/cash-flow';
import { CategoriesActions } from '@store/categories';
import { PrimeNGConfig } from 'primeng/api';
import { ThemeService } from './common/services/theme.service';

@Component({
  selector: 'ctrl-root',
  template: `
    <div class="max-w-[130rem] mx-auto">
      <ctrl-navigation></ctrl-navigation>

      <main class="h-[calc(100vh-82px)] px-3 pb-3 xl:pl-[22.5rem] xl:h-[100vh] xl:p-5">
        <ctrl-container>
          <router-outlet></router-outlet>
        </ctrl-container>
      </main>
    </div>

    <p-toast position="top-right"></p-toast>
  `,
})
export class AppComponent implements OnInit {
  private primengConfig: PrimeNGConfig = inject(PrimeNGConfig);
  private store: Store = inject(Store);
  private themeService: ThemeService = inject(ThemeService);

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.themeService.setTheme();
    this.dispatchStoreActions();
  }

  private dispatchStoreActions(): void {
    this.store.dispatch(CategoriesActions.getCategories());
    this.store.dispatch(CashFlowActions.getIncomes());
    this.store.dispatch(CashFlowActions.getExpenses());
  }
}
