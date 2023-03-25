import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CashFlow } from '@common/models/cash-flow.model';
import { Store } from '@ngrx/store';
import { CashFlowActions, CashFlowSelectors } from '@store/cash-flow';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'ctrl-incomes-view',
  template: `
    <ctrl-navigation>
      <ctrl-cash-flow-panel
        (cashFlowSubmitData)="onSubmit($event)"
        (itemToRemoveId)="removeIncome($event)"
        [cashFlowData]="(incomes$ | async)!"
        [totalCashFlowAmount]="(totalIncomeAmount$ | async)!"
        [isLoading]="(isLoading$ | async)!"
        [isIncomeMode]="true" />
    </ctrl-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesViewComponent {
  private store: Store = inject(Store);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  public incomes$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.incomes);
  public isLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);
  public totalIncomeAmount$: Observable<number> = this.store.select(CashFlowSelectors.totalIncomes);

  public onSubmit(incomeData: CashFlow): void {
    this.store.dispatch(CashFlowActions.addIncome({ income: incomeData }));
  }

  public removeIncome(incomeId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this income?',
      header: 'Confirmation',
      icon: 'pi pi-trash',
      accept: (): void => {
        this.store.dispatch(CashFlowActions.removeIncome({ incomeId }));
      },
    });
  }
}
