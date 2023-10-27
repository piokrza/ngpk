import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, tap } from 'rxjs';

import { CashFlowModule } from '#features/cash-flow';
import { UpdateFormComponent } from '#features/cash-flow/components';
import { CashFlow } from '#features/cash-flow/models';
import { UiModule } from '#shared/ui';
import { CashFlowActions, CashFlowSelectors } from '#store/cash-flow';

const imports = [AsyncPipe, CashFlowModule, UiModule];

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
  standalone: true,
  imports,
})
export default class IncomesComponent {
  private readonly store: Store = inject(Store);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly translateService: TranslateService = inject(TranslateService);
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
      message: this.translateService.instant('incomes.removeMessage'),
      header: this.translateService.instant('incomes.removeHeader'),
      icon: 'pi pi-trash',
      accept: (): void => this.store.dispatch(CashFlowActions.removeIncome({ incomeId })),
    });
  }

  public updateIncome(updatedIncome: CashFlow): void {
    const dialogRef: DynamicDialogRef = this.dialogService.open(UpdateFormComponent, {
      header: this.translateService.instant('incomes.updateIncome'),
      style: { width: '90%', maxWidth: '600px' },
      data: { updatedCashFlow: updatedIncome, isIncomeMode: this.isIncomeMode },
    });

    dialogRef.onClose
      .pipe(
        tap((updatedIncome?: CashFlow): void => {
          updatedIncome && this.store.dispatch(CashFlowActions.updateIncome({ updatedIncome }));
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
