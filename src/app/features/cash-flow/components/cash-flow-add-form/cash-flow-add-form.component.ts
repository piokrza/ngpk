/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { filter, Observable, take, tap } from 'rxjs';
import uniqid from 'uniqid';

import { User } from '#common/models';
import { Category } from '#common/models/category.model';
import { BaseCashFlowForm } from '#features/cash-flow/abstract';
import { CashFlow, CashFlowForm } from '#features/cash-flow/models';
import { AuthService } from '#pages/auth/services';

@Component({
  selector: 'ctrl-cash-flow-add-form',
  templateUrl: './cash-flow-add-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowAddFormComponent extends BaseCashFlowForm {
  @Input() public isIncomeMode!: boolean;

  @Output() public cashFlowSubmitData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  public readonly categories$: Observable<Category[]> = this.getCategories$(this.isIncomeMode);

  private userId!: string;

  public get formControls(): CashFlowForm {
    return this.form.controls;
  }

  public get modeLabel(): string {
    return this.isIncomeMode ? 'Income' : 'Expense';
  }

  public constructor() {
    super();

    inject(AuthService)
      .authState$.pipe(
        take(1),
        filter(Boolean),
        tap(({ uid }: User): string => (this.userId = uid))
      )
      .subscribe();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newCashFlow: CashFlow = {
      ...this.form.getRawValue(),
      date: Timestamp.fromDate(this.form.getRawValue().date!),
      uid: this.userId,
      id: uniqid(),
    };

    this.cashFlowSubmitData.emit(newCashFlow);
    this.form.reset();
  }
}
