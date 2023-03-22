import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';
import { CashFlowSelectors } from '@store/cash-flow';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-expenses-view',
  template: `
    <ctrl-cash-flow-panel
      (cashFlowSubmitData)="onSubmit($event)"
      [cashFlowData]="(expenses$ | async)!"
      [isLoading]="(isLoading$ | async)!"
      [isIncomeMode]="false" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesViewComponent {
  private store: Store = inject(Store);

  public expenses$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.expenses);
  public isLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);

  public onSubmit(expensesData: CashFlow): void {
    console.log(expensesData);
  }
}
