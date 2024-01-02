import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter } from 'rxjs';

import { IUser } from '#auth/models';
import { CashFlowForm, Category } from '#cash-flow/models';
import { CashFlowService } from '#cash-flow/services';
import { AuthSelectors } from '#store/auth';

@UntilDestroy()
@Component({
  selector: 'org-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {
  readonly #dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  readonly #firestore: AngularFirestore = inject(AngularFirestore);
  readonly #cashFlowService: CashFlowService = inject(CashFlowService);

  readonly form: FormGroup<CashFlowForm> = this.#cashFlowService.form;
  readonly trPath: string = 'cashFlow.form.';

  #userId!: string;
  readonly #isIncomeMode: boolean = inject(DynamicDialogConfig).data;

  currency: string = '';
  categories: Category[] = [];

  public constructor() {
    inject(Store)
      .select(AuthSelectors.user)
      .pipe(filter(Boolean), untilDestroyed(this))
      .subscribe({
        next: ({ uid, config }: IUser) => {
          this.#userId = uid;
          this.currency = config.currency;
          const { incomes, expenses } = config.categories;
          this.categories = this.#isIncomeMode ? incomes : expenses;
        },
      });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.#dialogRef.close({
      ...this.form.getRawValue(),
      date: Timestamp.fromDate(this.form.getRawValue().date!),
      uid: this.#userId,
      id: this.#firestore.createId(),
    });

    this.form.reset();
  }

  public get formControls(): CashFlowForm {
    return this.form.controls;
  }

  public get modeLabel(): string {
    return `${this.trPath}${this.#isIncomeMode ? 'income' : 'expense'}Name`;
  }
}
