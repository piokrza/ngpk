import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Category } from '@common/models/category.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { BaseCashFlowForm } from '@features/cash-flow/abstract/base-cash-flow-form';
import { CashFlowUpdateFormData } from '@features/cash-flow/models/cash-flow-update-form-data.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'ctrl-cash-flow-update-form',
  templateUrl: './cash-flow-update-form.component.html',
  styleUrls: ['./cash-flow-update-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashFlowUpdateFormComponent extends BaseCashFlowForm implements OnInit {
  private dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  public cashFlowUpdateFormData: CashFlowUpdateFormData = inject(DynamicDialogConfig).data;

  public categories$: Observable<Category[]> = this.getCategories$(this.cashFlowUpdateFormData.isIncomeMode);

  public ngOnInit(): void {
    this.pathCashFlowUpdateFormValue();
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

  public onSubmit(): void {
    const id: string = this.cashFlowUpdateFormData.updatedCashFlow.id;
    const date: Timestamp = Timestamp.fromDate(this.form.getRawValue().date!);

    this.dialogRef.close({ ...this.form.getRawValue(), date, id });
  }
}
