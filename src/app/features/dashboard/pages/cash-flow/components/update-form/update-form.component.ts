import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { AuthSelectors } from '#auth/store';
import { CashFlowForm, CashFlowUpdateFormData, Category } from '#cash-flow/models';
import { CashFlowService } from '#cash-flow/services';

@Component({
  selector: 'org-update-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly cashFlowService = inject(CashFlowService);

  readonly categories$ = this.getCategories$();

  readonly trPath: string = 'cashFlow.form.';
  readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;
  readonly cashFlowUpdateFormData: CashFlowUpdateFormData = inject(DynamicDialogConfig).data;

  ngOnInit(): void {
    this.form.patchValue({
      ...this.cashFlowUpdateFormData.updatedCashFlow,
      date: this.cashFlowUpdateFormData.updatedCashFlow.date.toDate(),
    });
  }

  onSubmit(): void {
    const id: string = this.cashFlowUpdateFormData.updatedCashFlow.id;
    const date: Timestamp = Timestamp.fromDate(this.form.getRawValue().date!);

    this.dialogRef.close({ ...this.form.getRawValue(), date, id });
  }

  get formControls(): CashFlowForm {
    return this.form.controls;
  }

  private getCategories$(): Observable<Category[]> {
    return this.store.select(AuthSelectors.user).pipe(
      filter(Boolean),
      map((user: IUser) => {
        const { incomes, expenses } = user.config.categories;
        return this.cashFlowUpdateFormData.isIncomeMode ? incomes : expenses;
      })
    );
  }
}
