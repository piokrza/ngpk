/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, filter, map } from 'rxjs';

import { IUser } from '#auth/models';
import { CashFlowForm, CashFlowUpdateFormData, Category } from '#cash-flow/models';
import { CashFlowService } from '#cash-flow/services';
import { AuthSelectors } from '#store/auth';

@Component({
  selector: 'org-update-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent implements OnInit {
  readonly #store: Store = inject(Store);
  readonly #dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  readonly #cashFlowService: CashFlowService = inject(CashFlowService);

  readonly categories$ = this.getCategories$();

  readonly trPath: string = 'cashFlow.form.';
  readonly form: FormGroup<CashFlowForm> = this.#cashFlowService.form;
  readonly cashFlowUpdateFormData: CashFlowUpdateFormData = inject(DynamicDialogConfig).data;

  public ngOnInit(): void {
    this.form.patchValue({
      ...this.cashFlowUpdateFormData.updatedCashFlow,
      date: this.cashFlowUpdateFormData.updatedCashFlow.date.toDate(),
    });
  }

  public onSubmit(): void {
    const id: string = this.cashFlowUpdateFormData.updatedCashFlow.id;
    const date: Timestamp = Timestamp.fromDate(this.form.getRawValue().date!);

    this.#dialogRef.close({ ...this.form.getRawValue(), date, id });
  }

  public get formControls(): CashFlowForm {
    return this.form.controls;
  }

  private getCategories$(): Observable<Category[]> {
    return this.#store.select(AuthSelectors.user).pipe(
      filter(Boolean),
      map((user: IUser) => {
        const { incomes, expenses } = user.config.categories;
        return this.cashFlowUpdateFormData.isIncomeMode ? incomes : expenses;
      })
    );
  }
}
