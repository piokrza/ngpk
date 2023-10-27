/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { Category } from '#common/models';
import { BaseCashFlowForm } from '#features/cash-flow/abstract';
import { CashFlowForm, CashFlowUpdateFormData } from '#features/cash-flow/models';

@Component({
  selector: 'ctrl-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent extends BaseCashFlowForm implements OnInit {
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);

  public readonly cashFlowUpdateFormData: CashFlowUpdateFormData = inject(DynamicDialogConfig).data;

  public categories$: Observable<Category[]> = this.getCategories$(this.cashFlowUpdateFormData.isIncomeMode);

  public readonly trPath: string = 'cashFlow.form.';

  public ngOnInit(): void {
    this.pathCashFlowUpdateFormValue();
  }

  public onSubmit(): void {
    const id: string = this.cashFlowUpdateFormData.updatedCashFlow.id;
    const date: Timestamp = Timestamp.fromDate(this.form.getRawValue().date!);

    this.dialogRef.close({ ...this.form.getRawValue(), date, id });
  }

  private pathCashFlowUpdateFormValue(): void {
    const { name, amount, categoryCode, date, description } = this.cashFlowUpdateFormData.updatedCashFlow;

    this.form.patchValue({
      name,
      amount,
      categoryCode,
      date: date!.toDate(),
      description,
    });
  }

  public get formControls(): CashFlowForm {
    return this.form.controls;
  }
}
