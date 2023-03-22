import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';
import { Store } from '@ngrx/store';
import { CashFlowActions, CashFlowSelectors } from '@store/cash-flow';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-incomes-view',
  template: `
    <ctrl-cash-flow-panel
      (cashFlowSubmitData)="onSubmit($event)"
      [cashFlowData]="(incomes$ | async)!"
      [isLoading]="(isLoading$ | async)!"
      [isIncomeMode]="true" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesViewComponent {
  private store: Store = inject(Store);

  public incomes$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.incomes);
  public isLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);

  public onSubmit(incomeData: CashFlow): void {
    this.store.dispatch(CashFlowActions.addIncome({ income: incomeData }));
  }
}
