/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

import { CashFlowService } from '#cash-flow/data-access';
import { CashFlowForm, CashFlowUpdateFormData, Category } from '#cash-flow/models';

@Component({
  selector: 'ctrl-update-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent implements OnInit {
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly cashFlowService: CashFlowService = inject(CashFlowService);

  public readonly trPath: string = 'cashFlow.form.';
  public readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;
  public readonly cashFlowUpdateFormData: CashFlowUpdateFormData = inject(DynamicDialogConfig).data;

  public readonly categories$: Observable<Category[]> = this.cashFlowService.getCategories$(this.cashFlowUpdateFormData.isIncomeMode);

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
