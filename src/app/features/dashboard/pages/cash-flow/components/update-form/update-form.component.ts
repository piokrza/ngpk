import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CashFlow, CashFlowForm, Category } from '#cash-flow/models';
import { CashFlowService } from '#cash-flow/services';
import { ConfigSelectors } from '#core/config/store';

@Component({
  selector: 'org-update-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly cashFlowService = inject(CashFlowService);

  readonly trPath: string = 'cashFlow.form.';
  readonly cashFlow: CashFlow = inject(DynamicDialogConfig).data;
  readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;

  readonly categories$: Observable<Category[]> = this.getCategories$();

  ngOnInit(): void {
    this.form.patchValue({
      ...this.cashFlow,
      date: this.cashFlow.date.toDate(),
    });
  }

  onSubmit(): void {
    const id: string = this.cashFlow.id;
    const date: Timestamp = Timestamp.fromDate(this.form.getRawValue().date!);

    this.dialogRef.close({ ...this.form.getRawValue(), date, id });
  }

  get controls(): CashFlowForm {
    return this.form.controls;
  }

  private getCategories$(): Observable<Category[]> {
    return this.store.select(ConfigSelectors.cashFlowCategories(this.cashFlow.type));
  }
}
