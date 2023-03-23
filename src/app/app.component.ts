import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CashFlowActions } from '@store/cash-flow';
import { CategoriesActions } from '@store/categories';
import { PrimeNGConfig } from 'primeng/api';
import { ThemeService } from '@common/services/theme.service';
import { PersistanceService } from '@common/services/persistance.service';

@Component({
  selector: 'ctrl-root',
  template: `
    <main><router-outlet></router-outlet></main>

    <p-toast position="top-right"></p-toast>
  `,
})
export class AppComponent implements OnInit {
  private primengConfig: PrimeNGConfig = inject(PrimeNGConfig);
  private store: Store = inject(Store);
  private themeService: ThemeService = inject(ThemeService);

  private isLightMode: boolean = inject(PersistanceService).get('isLightMode');

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.themeService.setTheme(this.isLightMode);
    this.dispatchStoreActions();
  }

  private dispatchStoreActions(): void {
    this.store.dispatch(CategoriesActions.getCategories());
    this.store.dispatch(CashFlowActions.getIncomes());
    this.store.dispatch(CashFlowActions.getExpenses());
  }
}
