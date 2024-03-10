import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, filter } from 'rxjs';

import { IUser } from '@ngpk/auth-organizer/model';
import { AuthSelectors } from '@ngpk/auth-organizer/state';

import { CashFlow, CashFlowForm, Category } from '#cash-flow/models';
import { CashFlowService } from '#cash-flow/services';
import { ConfigSelectors } from '#config/store';

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

  private readonly isIncomeMode: boolean = inject(DynamicDialogConfig).data;

  readonly categories$: Observable<Category[]> = this.getCategories$();
  readonly currency$: Observable<string> = this.store.select(ConfigSelectors.currency);

  readonly trPath: string = 'cashFlow.form.';
  readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;
  private userId!: string;

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
