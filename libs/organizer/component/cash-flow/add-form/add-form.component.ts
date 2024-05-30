import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Observable, filter, tap } from 'rxjs';

import { IUser, CashFlow, CashFlowForm, Category } from '@ngpk/organizer/model';
import { CashFlowService } from '@ngpk/organizer/service';
import { AuthSelectors } from '@ngpk/organizer/state/auth';
import { ConfigSelectors } from '@ngpk/organizer/state/config';

const imports = [
  AsyncPipe,
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextModule,
  TranslateModule,
  InputTextModule,
  InputNumberModule,
  InputTextareaModule,
  ReactiveFormsModule,
];

@Component({
  selector: 'ngpk-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
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

  readonly trPath = 'cashFlow.form.';
  readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;
  private userId!: string;

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.user)
      .pipe(
        filter(Boolean),
        tap(({ uid }: IUser) => (this.userId = uid)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
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
