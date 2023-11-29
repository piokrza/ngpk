/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, Observable, take, tap } from 'rxjs';

import { User } from '#auth/models';
import { AuthApi } from '#auth/services';
import { CashFlowService } from '#cash-flow/data-access';
import { CashFlowForm, Category } from '#cash-flow/models';

@Component({
  selector: 'ctrl-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent implements OnInit {
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly firestore: AngularFirestore = inject(AngularFirestore);
  private readonly cashFlowService: CashFlowService = inject(CashFlowService);

  public categories$!: Observable<Category[]>;

  public readonly trPath: string = 'cashFlow.form.';
  private readonly isIncomeMode: boolean = inject(DynamicDialogConfig).data;
  public form: FormGroup<CashFlowForm> = this.cashFlowService.form;
  private userId!: string;

  public constructor() {
    inject(AuthApi)
      .authState$.pipe(
        take(1),
        filter(Boolean),
        tap(({ uid }: User): string => (this.userId = uid))
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.categories$ = this.cashFlowService.getCategories$(this.isIncomeMode);
  }

  public onSubmit(): void {
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

  public get formControls(): CashFlowForm {
    return this.form.controls;
  }

  public get modeLabel(): string {
    return `${this.trPath}${this.isIncomeMode ? 'income' : 'expense'}Name`;
  }
}
