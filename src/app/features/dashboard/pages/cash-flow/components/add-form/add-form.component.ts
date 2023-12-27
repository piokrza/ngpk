import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { filter, Observable, tap } from 'rxjs';

import { IUser } from '#auth/models';
import { AuthApiService } from '#auth/services';
import { CashFlowForm, Category } from '#cash-flow/models';
import { CashFlowService } from '#cash-flow/services';

@UntilDestroy()
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
  public form: FormGroup<CashFlowForm> = this.cashFlowService.form;
  private userId!: string;
  private readonly isIncomeMode: boolean = inject(DynamicDialogConfig).data;

  public constructor() {
    inject(AuthApiService)
      .authState$.pipe(
        filter(Boolean),
        tap(({ uid }: IUser): string => (this.userId = uid)),
        untilDestroyed(this)
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
