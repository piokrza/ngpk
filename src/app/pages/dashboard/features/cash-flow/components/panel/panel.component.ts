import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

import { CashFlowService } from '#cash-flow/data-access';
import { CashFlow } from '#cash-flow/models';

@UntilDestroy()
@Component({
  selector: 'ctrl-cash-flow-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
  private readonly cashFlowService: CashFlowService = inject(CashFlowService);

  @Input({ required: true }) public cashFlowData!: CashFlow[];
  @Input({ required: true }) public isIncomeMode!: boolean;
  @Input({ required: true }) public isLoading!: boolean;
  @Input({ required: true }) public totalCashFlowAmount!: number;

  @Output() public cashFlowToRemoveId: EventEmitter<string> = new EventEmitter<string>();
  @Output() public cashFlowToUpdate: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();
  @Output() public cashFlowSubmitData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  public openCashFlowDialog(): void {
    this.cashFlowService
      .openCashFlowDialog$(this.isIncomeMode)
      .pipe(
        tap((cashFlow?: CashFlow) => cashFlow && this.cashFlowSubmitData.emit(cashFlow)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public get addCashFlowBtnLabel(): string {
    return `cashFlow.form.${this.isIncomeMode ? 'income' : 'expense'}NameAdd`;
  }
}
