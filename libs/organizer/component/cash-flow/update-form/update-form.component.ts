import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';

import { CashFlow, CashFlowForm, Category } from '@ngpk/organizer/model';
import { CashFlowService } from '@ngpk/organizer/service';
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
  selector: 'ngpk-update-form',
  templateUrl: './update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
})
export class UpdateFormComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly cashFlowService = inject(CashFlowService);

  readonly trPath: string = 'cashFlow.form.';
  readonly cashFlow: CashFlow = inject(DynamicDialogConfig).data;
  readonly form: FormGroup<CashFlowForm> = this.cashFlowService.form;

  readonly categories$: Observable<Category[]> = this.store.select(ConfigSelectors.cashFlowCategories(this.cashFlow.type));

  ngOnInit(): void {
    setTimeout(() => {
      this.form.patchValue({
        name: this.cashFlow.name,
        amount: this.cashFlow.amount,
        categoryId: this.cashFlow.categoryId,
        description: this.cashFlow.description,
        date: this.cashFlow.date.toDate(),
      });
    }, 50);
  }

  onSubmit(): void {
    const id: string = this.cashFlow.id;
    const date: Timestamp = Timestamp.fromDate(this.form.getRawValue().date ?? new Date());

    this.dialogRef.close({ ...this.cashFlow, ...this.form.getRawValue(), date, id } satisfies CashFlow);
  }

  get controls(): CashFlowForm {
    return this.form.controls;
  }
}
