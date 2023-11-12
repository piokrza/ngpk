/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { Category } from '#common/models';
import { CashFlowForm, CashFlowUpdateFormData } from '#pages/dashboard/pages/cash-flow/models';
import { CashFlowFormService } from '#pages/dashboard/pages/cash-flow/services';

@Component({
  selector: 'ctrl-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent implements OnInit {
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly cashFlowFormService: CashFlowFormService = inject(CashFlowFormService);

  public readonly trPath: string = 'cashFlow.form.';
  public readonly form: FormGroup<CashFlowForm> = this.cashFlowFormService.form;
  public readonly cashFlowUpdateFormData: CashFlowUpdateFormData = inject(DynamicDialogConfig).data;

  public readonly categories$: Observable<Category[]> = this.cashFlowFormService.getCategories$(this.cashFlowUpdateFormData.isIncomeMode);

  public ngOnInit(): void {
    this.form.patchValue({
      ...this.cashFlowUpdateFormData.updatedCashFlow,
      date: this.cashFlowUpdateFormData.updatedCashFlow.date.toDate(),
    });
  }

  public onSubmit(): void {
    const id: string = this.cashFlowUpdateFormData.updatedCashFlow.id;
    const date: Timestamp = Timestamp.fromDate(this.form.getRawValue().date!);

    this.dialogRef.close({ ...this.form.getRawValue(), date, id });
  }

  public get formControls(): CashFlowForm {
    return this.form.controls;
  }
}
