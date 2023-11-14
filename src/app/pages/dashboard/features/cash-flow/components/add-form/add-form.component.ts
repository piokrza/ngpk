/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { filter, Observable, take, tap } from 'rxjs';
import uniqid from 'uniqid';

import { User } from '#common/models';
import { AuthService } from '#pages/auth/services';
import { CashFlowFormService } from '#pages/dashboard/features/cash-flow/data-access';
import { CashFlow, CashFlowForm, Category } from '#pages/dashboard/features/cash-flow/models';

@Component({
  selector: 'ctrl-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent implements OnInit {
  private readonly cashFlowFormService: CashFlowFormService = inject(CashFlowFormService);

  @Input({ required: true }) public isIncomeMode!: boolean;

  @Output() public cashFlowSubmitData: EventEmitter<CashFlow> = new EventEmitter<CashFlow>();

  public categories$!: Observable<Category[]>;

  public readonly trPath: string = 'cashFlow.form.';
  public form: FormGroup<CashFlowForm> = this.cashFlowFormService.form;
  private userId!: string;

  public constructor() {
    inject(AuthService)
      .authState$.pipe(
        take(1),
        filter(Boolean),
        tap(({ uid }: User): string => (this.userId = uid))
      )
      .subscribe();
  }

  public ngOnInit(): void {
    this.categories$ = this.cashFlowFormService.getCategories$(this.isIncomeMode);
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cashFlowSubmitData.emit(<CashFlow>{
      ...this.form.getRawValue(),
      date: Timestamp.fromDate(this.form.getRawValue().date!),
      uid: this.userId,
      id: uniqid(),
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
