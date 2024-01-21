import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { IUser } from '#auth/models';
import { CashFlowForm, Category } from '#cash-flow/models';
import { CashFlowService } from '#cash-flow/services';
import { AuthSelectors } from '#store/auth';

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

  readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;
  readonly trPath: string = 'cashFlow.form.';

  private userId!: string;
  private readonly isIncomeMode: boolean = inject(DynamicDialogConfig).data;

  currency: string = '';
  categories: Category[] = [];

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.user)
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ uid, config }: IUser) => {
          this.userId = uid;
          this.currency = config.currency;
          const { incomes, expenses } = config.categories;
          this.categories = this.isIncomeMode ? incomes : expenses;
        },
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
      uid: this.userId,
      id: this.firestore.createId(),
    });

    this.form.reset();
  }

  get formControls(): CashFlowForm {
    return this.form.controls;
  }

  get modeLabel(): string {
    return `${this.trPath}${this.isIncomeMode ? 'income' : 'expense'}Name`;
  }
}
