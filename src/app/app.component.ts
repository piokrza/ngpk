import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '@store/categories';
import { PrimeNGConfig } from 'primeng/api';
import { IncomesActions } from '@store/incomes';
import { IncomesService } from './pages/incomes/services/incomes.service';

@Component({
  selector: 'ctrl-root',
  template: `
    <div class="max-w-[130rem] mx-auto">
      <ctrl-navigation></ctrl-navigation>

      <main class="h-[calc(100vh-82px)] p-3 xl:pl-[22.5rem] xl:h-[100vh] xl:p-5">
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

  incomes = inject(IncomesService);

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.dispatchStoreActions();
  }

  private dispatchStoreActions(): void {
    this.store.dispatch(CategoriesActions.getCategories());
    this.store.dispatch(IncomesActions.getIncomes());
  }
}
