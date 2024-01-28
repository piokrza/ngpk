import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { AuthSelectors } from '#auth/store';
import { CashFlow, CashFlowForm, Category } from '#cash-flow/models';
import { CashFlowService } from '#cash-flow/services';
import { ConfigSelectors } from '#core/config/store';

@Component({
  selector: 'org-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly firestore = inject(AngularFirestore);
  private readonly cashFlowService = inject(CashFlowService);

  readonly categories$: Observable<Category[]> = this.getCategories$();
  readonly currency$: Observable<string> = this.store.select(ConfigSelectors.currency);

  readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;
  readonly trPath: string = 'cashFlow.form.';

  private userId!: string;
  private readonly isIncomeMode: boolean = inject(DynamicDialogConfig).data;

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.user)
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ uid }: IUser) => (this.userId = uid),
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close({
      ...this.form.getRawValue(),
      date: Timestamp.fromDate(this.form.getRawValue().date!),
      type: this.isIncomeMode ? 'income' : 'expense',
      uid: this.userId,
      id: this.firestore.createId(),
    } satisfies CashFlow);

    this.form.reset();
  }

  get formControls(): CashFlowForm {
    return this.form.controls;
  }

  get modeLabel(): string {
    return `${this.trPath}${this.isIncomeMode ? 'income' : 'expense'}Name`;
  }

  private getCategories$(): Observable<Category[]> {
    return this.store.select(ConfigSelectors.cashFlowCategories(this.isIncomeMode ? 'income' : 'expense'));
  }
}
