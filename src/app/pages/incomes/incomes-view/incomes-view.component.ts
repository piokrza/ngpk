import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, tap } from 'rxjs';

import { CashFlowUpdateFormComponent } from '#features/cash-flow/components';
import { CashFlow } from '#features/cash-flow/models';
import { CashFlowActions, CashFlowSelectors } from '#store/cash-flow';

@UntilDestroy()
@Component({
  selector: 'ctrl-incomes-view',
  template: `
    <ctrl-cash-flow-panel
      (cashFlowSubmitData)="onSubmit($event)"
      (cashFlowToRemoveId)="removeIncome($event)"
      (cashFlowToUpdate)="updateIncome($event)"
      [cashFlowData]="(incomes$ | async)!"
      [totalCashFlowAmount]="(totalIncomeAmount$ | async)!"
      [isLoading]="(isLoading$ | async)!"
      [isIncomeMode]="isIncomeMode" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesViewComponent {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public incomes$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.incomes);
  public isLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);
  public totalIncomeAmount$: Observable<number> = this.store.select(CashFlowSelectors.totalIncomes);

  public isIncomeMode = true;

  public onSubmit(incomeData: CashFlow): void {
    this.store.dispatch(CashFlowActions.addIncome({ income: incomeData }));
  }

  public removeIncome(incomeId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this income?',
      header: 'Remove income',
      icon: 'pi pi-trash',
      accept: (): void => this.store.dispatch(CashFlowActions.removeIncome({ incomeId })),
    });
  }

  public updateIncome(updatedIncome: CashFlow): void {
    const dialogRef: DynamicDialogRef = this.dialogService.open(CashFlowUpdateFormComponent, {
      header: 'Update income',
      style: { width: '90%', maxWidth: '600px' },
      data: { updatedCashFlow: updatedIncome, isIncomeMode: this.isIncomeMode },
    });

    dialogRef.onClose
      .pipe(
        tap((updatedIncome: CashFlow): void => {
          updatedIncome && this.store.dispatch(CashFlowActions.updateIncome({ updatedIncome }));
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
