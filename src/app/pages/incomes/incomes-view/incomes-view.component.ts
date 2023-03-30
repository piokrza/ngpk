import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CashFlowUpdateFormComponent } from '@features/cash-flow/components/cash-flow-update-form/cash-flow-update-form.component';
import { CashFlow } from '@features/cash-flow/models/cash-flow.model';
import { Store } from '@ngrx/store';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { CashFlowActions, CashFlowSelectors } from '@store/cash-flow';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'ctrl-incomes-view',
  template: `
    <ctrl-navigation>
      <ctrl-cash-flow-panel
        (cashFlowSubmitData)="onSubmit($event)"
        (cashFlowToRemoveId)="removeIncome($event)"
        (cashFlowToUpdate)="updateIncome($event)"
        [cashFlowData]="(incomes$ | async)!"
        [totalCashFlowAmount]="(totalIncomeAmount$ | async)!"
        [isLoading]="(isLoading$ | async)!"
        [isIncomeMode]="isIncomeMode" />
    </ctrl-navigation>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomesViewComponent extends DestroyComponent {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly confirmationService: ConfirmationService = inject(ConfirmationService);

  public incomes$: Observable<CashFlow[]> = this.store.select(CashFlowSelectors.incomes);
  public isLoading$: Observable<boolean> = this.store.select(CashFlowSelectors.isLoading);
  public totalIncomeAmount$: Observable<number> = this.store.select(CashFlowSelectors.totalIncomes);

  public isIncomeMode: boolean = true;

  constructor() {
    super();
  }

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

  public updateIncome(updatedIncome: CashFlow): void {
    const dialogRef: DynamicDialogRef = this.dialogService.open(CashFlowUpdateFormComponent, {
      header: 'Update income',
      style: { width: '90%', maxWidth: '600px' },
      data: { updatedCashFlow: updatedIncome, isIncomeMode: this.isIncomeMode },
    });

    dialogRef.onClose.pipe(takeUntil(this.destroy$)).subscribe({
      next: (updatedIncome: CashFlow): void => {
        updatedIncome && this.store.dispatch(CashFlowActions.updateIncome({ updatedIncome }));
      },
    });
  }
}
